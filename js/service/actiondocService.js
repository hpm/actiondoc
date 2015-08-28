angular.module("ActionDocApp")
  .factory('ActionDocService', function($http,$location, $q) {
  
    // local vars
    var datas = null;
    var urlName = '';
    var urlLink = null;

    // build recursive list of functions split by "/" 
    function addChild(obj, pathArray) {
      var key = pathArray.shift();
      if(!(key in obj)) {
        obj[key] = {};
      }
      if(!pathArray.length) {
        return;
      }
      addChild(obj[key], pathArray);
    }


    var ActiondocService = {
        getDoc: function(url) {
          return $q(function(resolve, reject) {
            url = String(url);

            if (url) {
                // auto-add http
              if ( url.substr(0,4) != 'http' ) {
                url = "http://" + url;
              }

              // auto-add /showDocumentation
              if( url.indexOf("/", 10) == -1) {
                url += "/api/showDocumentation";
              }

              // try to load from url
              $http.get(url).then(function(data) {
                urlLink = url;

                // if the server provides a name, remember it
                if ( data.data && data.data.serverInformation && data.data.serverInformation.serverName ) {
                    urlName = data.data.serverInformation.serverName;
                }

                // save documentation list
                if ( data && data.data && data.data.documentation ) {
                    datas = data.data.documentation;
                    resolve();
                }
                else {
                    reject("No documentation found");
                }
              }, function(status) {
                reject(status);
              });
            }
            
            // no url given
            else {
              reject("Missing url");
            }
          });
        },

        // return current url
        getUrl: function() {
          return urlLink;
        },
        
        // return current title
        getTitle: function() {
            if ( urlName ) {
                return urlName;
            }
            
            var l = document.createElement("a");
            l.href = urlLink;
            return l.hostname;
        },
        
        // get raw data
        getData: function() {
          return datas;
        },
        
        // get menu structure
        getMenuStructure: function() {
          var menu = {};
          return $q(function(resolve, reject) {
            for(var i in datas) {
              var currentEntry = i.split("/");
              var temp = "";
              for(var j in currentEntry) {
                temp += currentEntry[j] + "/";
                currentEntry[j] = temp.slice(0, -1);
              }
              addChild(menu, currentEntry);
            }
            resolve(menu);
          });
        },
        
        // get details by id
        getDetailsEntry: function(key) {
            return datas[key] ? [datas[key][1]] : [];
        },
        
        // search details
        searchDetailsEntry: function(key) {
          var results = [];
          for(var i in datas) {
            if(!key || i.indexOf(key) > -1) {
              results.push(datas[i][1]);
            }
          }
          return results;
        }

    };

    return ActiondocService;
});