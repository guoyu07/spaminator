'use strict';

angular.module('spaminatorApp')
  .controller('PopulationCtrl', function ($scope, UserView, $http) {
    // Set the Population tab viewable
    UserView.setViewable("Population");

    // Population array
    $scope.population = [];

    // Determine if the next step should be visible
    $scope.allowNext = function() {
        return $scope.population.length > 0 ? true : false;
    }

    // Remove a member from the population array
    $scope.remove = function(index) {
        $scope.population.splice(index,1);
    }

    // Submit population modal 
    $scope.popEntrySubmit = function(memberInfo) { 

        if (memberInfo) {
            console.log("Doing it");
            //$http.post("scripts/getPopulation.php", memberInfo)     // Replace the next line with this line for production
            $http.post("http://blackfoot.appstate.edu/~chris/spaminator/app/scripts/getPopulation.php", memberInfo)  // Remove in production
                .success(function(popData, status, headers, config) {
                    // Push each person into the population array
                    popData.forEach(function(entry) {
                        $scope.population.push([entry["id"],entry["lname"],entry["fname"],"","","","",""]);
                        //TODO: need a better way to fill in missing info
                    });

                    // Empty the modal
                    $scope.popEntryData="";
                })
                .error(function(popData, status, headers, config) {
                    console.log("ERROR--------------------------------");
                    console.log(status);
                    console.log(config);
                    console.log(popData);
                });
        }
        // Close the modal whether success, error, or empty input
        $('#add-population-modal').modal('hide');
    };
    
    // Cancel population modal, and clear the <textarea>
    $scope.popEntryCancel = function() {
        $scope.popEntryData="";
        $('#add-population-modal').modal('hide');
    };
  });
