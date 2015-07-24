angular.module('ActionDocApp')
    .config(function($translateProvider) {
        $translateProvider.translations('en', {
          'server_start': 'Start',
          'server_input_placeholder': 'Doc-Url...',
          'server_lasturl_tooltip': 'Open Link'
        });
    });