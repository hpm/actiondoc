angular.module('ActionDocApp')
    .config(function($translateProvider) {
        $translateProvider.translations('en', {
          'server_start': 'Start',
          'server_input_placeholder': 'Documentation-Url, e.g. http://yourActionHero.com/showDocumentation',
          'server_lasturl_tooltip': 'Open Link'
        });
    });