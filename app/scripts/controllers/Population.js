'use strict';

angular.module('spaminatorApp')
  .controller('PopulationCtrl', function ($scope, UserView) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //UserView.setViewable("Template");
    $scope.allowNext = function() {
        return $scope.population.length > 0 ? true : false;
    }

    // Test data
    $scope.population = [["900458187","Coley","Christopher","Jacob","","","coleycj","coleycj@appstate.edu"],
                         ["000000000","McTester","Test","Reginald","Sir","III","mctestertr","mctestertr@appstate.edu"]];
  });
