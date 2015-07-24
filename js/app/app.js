angular.module('ActionDocApp', ['ngRoute','ngCookies', 'ngStorage' ,'pascalprecht.translate', 'pwTreeHelper', 'ngPrettyJson'])
    .config(function($translateProvider, ActionDocConfig, $routeProvider) {
      $translateProvider.determinePreferredLanguage();
    })
    .run(function ($document, $translate, ActionDocConfig, ActionDocService) {
        $translate.use(ActionDocConfig.fallbackLanguage);
        $translate.fallbackLanguage(ActionDocConfig.fallbackLanguage);
        $document.ready(function () {
            FastClick.attach($document.body);
        });
    })
    ;