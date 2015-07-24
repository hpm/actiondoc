angular.module('ActionDocApp')
  .controller('AppCtrl', function($scope, $location, $timeout,$route, ActionDocService, ActionDocConfig) {
    $scope.toggleState = {};
    $scope.appTitle = "Loading...";
    $scope.appSearch = $location.search().search || "";
    if($location.search().url) {
    ActionDocService.getDoc($location.search().url)
        .then(function(status) {
          $scope.appTitle = ActionDocService.getTitle();
          document.title = "Actiondoc: " + ActionDocService.getTitle();
          $scope.results = ActionDocService.getDetailsEntry($scope.appSearch);
          $scope.menu = ActionDocService.getMenuStructure().then(function(menu) {
            $scope.menu = menu;
          });

        })
        .catch(function(reason) {
          var error = reason.statusText || reason;
          alert('Error: ' + error);
          $location.path("/");
          $location.search('url', null);
        });
    }
    else {
      $location.path("/");
      $location.search('url', null);
    }
    $scope.getKeys = Object.keys;
    $scope.toggle = function(name) {
      for (var i in $scope.toggleState) {
        if(name == i) {
          if(!$scope.toggleState[i]) {
            //[].splice.call($scope.results.splice(0, $scope.results.length), [0,0].concat(ActionDocService.getDetailsEntry(name)));
            $scope.results = ActionDocService.getDetailsEntry(name);
          }
          else {
            $scope.results = ActionDocService.getDetailsEntry();
          }
          $scope.toggleState[i] = !$scope.toggleState[i];
          continue;
        }
        $scope.toggleState[i] = (name.indexOf(i) == 0);
      }
    };

    $scope.$watch('appSearch', function() {
      $scope.results = ActionDocService.getDetailsEntry($scope.appSearch);
      $location.search('search', $scope.appSearch);
    });

    var lastRoute = $route.current;
    $scope.$on('$locationChangeSuccess', function (event) {
      if (lastRoute.$$route.originalPath === $route.current.$$route.originalPath) {
          $route.current = lastRoute;
      }
    });
  });