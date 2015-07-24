angular.module('ActionDocApp')
  .controller('ServerCtrl', function($scope, $location, $localStorage, ActionDocService) {

    // storage of previously used urls
    $scope.lastUrls = $localStorage.lastUrls || null;

    // load url
    $scope.testUrl = function(serverUrl) {
        ActionDocService.getDoc(serverUrl)
            .then(function(status) {
                var url = ActionDocService.getUrl();
                if ( $localStorage.lastUrls.indexOf(serverUrl) == -1 ) {
                    $localStorage.lastUrls.push(serverUrl);
                }
                
                $location.path("/app");
                $location.search('url', url);
            })
            .catch(function(error) {
                console.log('Error', error);
            })
            ;
        };


        $scope.deleteLastUrl = function(url) {
            $scope.lastUrls.splice($scope.lastUrls.indexOf(url),1);
        }
  })
  .filter('encodeURIComponent', function() {
    return window.encodeURIComponent;
});