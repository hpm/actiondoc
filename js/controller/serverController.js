angular.module('ActionDocApp')
  .controller('ServerCtrl', function($scope, $location, $localStorage, ActionDocService) {

    // storage of previously used urls
    $scope.lastDocs = $localStorage.lastDocs || null;

    // load url
    $scope.testUrl = function(serverUrl) {
        ActionDocService.getDoc(serverUrl)
            .then(function(status) {
                var url = ActionDocService.getUrl();
                if ( !$localStorage.lastDocs ) {
                    $localStorage.lastDocs = [];
                }
                if ( $localStorage.lastDocs.indexOf(serverUrl) == -1 ) {
                    $localStorage.lastDocs.push({
                        title: ActionDocService.getTitle(),
                        url: ActionDocService.getUrl()
                    });
                }
                
                $location.path("/app");
                $location.search('url', url);
            })
            .catch(function(error) {
                console.log('Error', error);
            })
            ;
        };


        $scope.deleteLastDoc = function(doc) {
            $scope.lastDocs.splice($scope.lastDocs.indexOf(doc),1);
        }
  })
  .filter('encodeURIComponent', function() {
    return window.encodeURIComponent;
});