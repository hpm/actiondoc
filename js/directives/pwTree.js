/**
 * Angular Directive Tree View
 */

angular.module('ActionDocApp')
  .directive("pwTree", function(pwTreeHelper) {
    return {
      restrict: "A",
      scope: {
        family: '=',
        getKeys: '=',
        toggleState: '=',
        toggle: '='
      },
      template:
        '<li class="pointer" ng-repeat="child in getKeys(family)">' +
          '<span ng-init="toggleState[child]=false" ng-class="{\'parent\' : getKeys(family[child]).length}" ng-click="toggle(child)">{{child.split("/").slice(-1).join()}}</span><i ng-class="{\'parenticon glyphicon glyphicon-chevron-right\': getKeys(family[child]).length && !toggleState[child], \'parenticon glyphicon glyphicon-chevron-down\': getKeys(family[child]).length && toggleState[child]}"></i>' +
          '<ul data-ng-show="toggleState[child]" data-pw-tree data-family="family[child]" data-get-keys="getKeys" data-toggle-state="toggleState"  data-toggle="toggle"></ul>' +
        '</li>',
      compile: function(element) {
        return pwTreeHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){

        });
      }
    };
  });