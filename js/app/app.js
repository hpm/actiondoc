angular.module('ActionDocApp', ['ngRoute','ngCookies', 'ngStorage' ,'pascalprecht.translate', 'pwTreeHelper', 'ngPrettyJson'])
    .config(function($translateProvider) {
      $translateProvider.determinePreferredLanguage();
    })
    .run(function ($document, $translate, ActionDocConfig) {
        $translate.use(ActionDocConfig.fallbackLanguage);
        $translate.fallbackLanguage(ActionDocConfig.fallbackLanguage);
        $document.ready(function () {
            FastClick.attach($document.body);
        });
    })
    ;