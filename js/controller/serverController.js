angular.module('ActionDocApp')
  .controller('ServerCtrl', function($scope, $location, $localStorage, ActionDocService, ActionDocConfig) {
    $scope.lastUrls = $localStorage.lastUrls || null;
    $scope.progressUrl = function(mode, index) {
      ActionDocService.getDoc((mode == "last") ? $scope.lastUrls[index] : $scope.inputUrl)
        .then(function(status) {
          var url = ActionDocService.getUrl();
          if(mode != "last") {
            if($localStorage.lastUrls) {
              var curIndex = $localStorage.lastUrls.indexOf(url);
              if(curIndex < 0) {
                $localStorage.lastUrls.unshift(url);
              }
              else {
                $localStorage.lastUrls.splice(curIndex, 1);
                $localStorage.lastUrls.unshift(url);
              }
            }
            else {
              $localStorage.lastUrls = [url];
            }
          }
          else {
            var lastUrl = $scope.lastUrls[index];
            $localStorage.lastUrls.splice(index, 1);
            $localStorage.lastUrls.unshift(lastUrl);
          }
          $location.path( "/app");
          $location.search('url', ActionDocService.getUrl());
          console.log(ActionDocService.getData());
        })
        .catch(function(reason) {
          var error = reason.statusText || reason;
          alert('Error: ' + error);
        })
      ;
    };
    $scope.deleteSingleLastUrl = function(url) {
      $scope.lastUrls.splice($scope.lastUrls.indexOf(url),1);
    }
  });