angular.module('ActionDocApp')
    .config(function($routeProvider, ActionDocConfig) {
        $routeProvider
            .when('/', {
                templateUrl: ActionDocConfig.templatePath + 'server/server.html',
                controller: 'ServerCtrl'
            })
            .when('/app', {
                templateUrl: ActionDocConfig.templatePath + 'app/app.html',
                controller: 'AppCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    ;
