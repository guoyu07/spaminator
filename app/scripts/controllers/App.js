'use strict';

angular.module('spaminatorApp')
    .controller('AppCtrl', function ($scope, $rootScope, UserAuth) {
        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection);
        });

        $scope.user = UserAuth;
    });
