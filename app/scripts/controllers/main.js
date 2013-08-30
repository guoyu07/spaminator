'use strict';

angular.module('spaminatorApp')
  .controller('MainCtrl', function ($scope, UserView) {
    UserView.setViewable("Population");
    UserView.setViewable("History");
  });
