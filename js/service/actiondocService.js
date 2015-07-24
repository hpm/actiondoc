angular.module("ActionDocApp")
  .factory('ActionDocService', function($http,$location, $q) {
    var datas = null;
    var urlLink = null;
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
            if(url) {
              if(url.indexOf("http://") < 0) {
                url = "http://" + url;
              }
              if(url.indexOf("/showDocumentation") < 0) {
                url = url + "/showDocumentation";
              }
              $http.get(url).then(function(data) {
                urlLink = url;
                datas = data.data.documentation;
                resolve(true);
              }, function(status) {
                reject(status);
              });
            }
            else {
              reject("Empty");
            }
          });
        },
        getUrl: function() {
          return urlLink;
        },
        getTitle: function() {
          return urlLink.slice(7).slice(0, urlLink.length - 25);
        },
        getData: function() {
          return datas;
        },
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
        getDetailsEntry: function(key) {
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