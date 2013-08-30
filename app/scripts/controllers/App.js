'use strict';

angular.module('spaminatorApp')
    .controller('AppCtrl', function ($scope, $rootScope, $location, UserAuth, UserView) {
        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection);
            $location.path('/');
            // TODO: Maybe I should inform the user that the routeChangeError occured
        });

        $rootScope.$on("$routeChangeSuccess", function () {
            //console.log($location.path());
            $scope.path = $location.path()
        });

        $scope.user = UserAuth;
        $scope.view = UserView;
    });
