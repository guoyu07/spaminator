'use strict';

angular.module('spaminatorApp')
  .service('UserAuth', function () {
    // TODO: implement some logic to determine if the user is logged in, and/or allowed access
    this.fname = 'Chris';
    this.lname = 'Coley';
    this.isLogged = true;
    this.isAllowed = true;
  });
