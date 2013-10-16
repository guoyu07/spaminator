'use strict';

angular.module('spaminatorApp')
  .controller('TemplateCtrl', function ($scope, UserView) {
    // Set the current tab viewable
    UserView.setViewable('Sender');

    // Array of templates
    $scope.templates = [];
    $scope.templatesLoaded = true;
    $scope.editTemplate = false;
    $scope.activeTemplate;

    // Test template
    var testTemplate = {};
    testTemplate.name = "Test Template";
    testTemplate.template = "This is a test template for an email.";

    // Populate the templates array with test data
    $scope.templates.push(testTemplate);

    $scope.loadTemplate = function(index) {
        $scope.editTemplate = true;
        $scope.activeTemplate = $scope.templates[index];
    }

    $scope.newTemplate = function() {
        $scope.editTemplate = true;
        console.log("Creating new template");
    }
  });
