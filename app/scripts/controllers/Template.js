'use strict';

angular.module('spaminatorApp')
  .controller('TemplateCtrl', function ($scope, UserView) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    UserView.setViewable('Sender');
  });
