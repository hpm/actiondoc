angular.module('ActionDocApp')
  .controller('AppCtrl', function($scope, $location, ActionDocService, $route) {
    // init vars
    $scope.toggleState = {};
    $scope.appTitle = "Loading…";
    $scope.appSearch = $location.search().search || "";
    var url = $location.search().url;

    // load documentation url
    if (url) {
        ActionDocService.getDoc(url)
            .then(function(status) {
                $scope.appTitle = ActionDocService.getTitle() || url;
                $scope.results = ActionDocService.getDetailsEntry($scope.appSearch);
            })
            .catch(function(reason) {
                console.log('Error: ', reason);
                $location.path("/");
                $location.search('url', null);
            })
            .then(function () {
                ActionDocService.getMenuStructure().then(function(menu) {
                    $scope.menu = menu;
                });
            })
            .then(function () {
                var name = $location.search().function;
                var details = ActionDocService.getDetailsEntry(name);
                if ( !details.length ) {
                    details = ActionDocService.searchDetailsEntry(name);
                }
                $scope.results = details;
            });
    }
    else {
        $location.path("/");
    }

    // helper to get object keys
    $scope.getKeys = function (obj) {
        return typeof(obj) == 'object' ? Object.keys(obj) : [];
    };

    // toggle menu tree displays
    $scope.toggleMenu = function(name) {
        if ( typeof($scope.toggleState[name]) !== 'undefined' ) {
            $scope.toggleState[name] = !$scope.toggleState[name];
            var details = ActionDocService.getDetailsEntry(name);
            if ( !details.length ) {
                details = ActionDocService.searchDetailsEntry(name);
            }
            $scope.results = details;
            $location.search('function', name);
        }
    };

    // watch for search changes and trigger live search
    $scope.$watch('search', function() {
      $scope.results = ActionDocService.searchDetailsEntry($scope.search);
      $location.search('search', $scope.search);
    });

    // prevent "reload" behaviour on parameter changes
    var lastRoute = $route.current;
    $scope.$on('$locationChangeSuccess', function (event) {
      if (lastRoute.$$route.originalPath === $route.current.$$route.originalPath) {
          $route.current = lastRoute;
      }
    });

});