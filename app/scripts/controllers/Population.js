'use strict';

angular.module('spaminatorApp')
  .controller('PopulationCtrl', function ($scope, UserView, $http) {
    // Set the current tab viewable
    UserView.setViewable("Population");

    // Population array
    $scope.population = [];

    // We use the Banner ID to keep duplicates out of the population
    // This array holds the Banner ID of every current population member
    $scope.popIds = [];

    // Determine if the next step should be visible
    $scope.allowNext = function() {
        return $scope.population.length > 0 ? true : false;
    }

    // Remove a member from the population array
    $scope.remove = function(index) {
        $scope.population.splice(index,1);

        // Also remove their id from the popIds array so they can be re-added later.
        $scope.popIds.splice(index,1);
    }

    // Submit population modal 
    $scope.popEntrySubmit = function(memberInfo) { 

        if (memberInfo) {
            //$http.post("scripts/getPopulation.php", memberInfo)     // Replace the next line with this line for production
            $http.post("http://blackfoot.appstate.edu/~chris/spaminator/app/scripts/getPopulation.php", memberInfo)  // Remove in production
                .success(function(popData, status, headers, config) {
                    // Push each person into the population array
                    popData.forEach(function(entry) {
                        // Only add people to the population if they are not already in it
                        if ($.inArray(entry["id"], $scope.popIds) == -1) {
                            $scope.population.push([entry["id"],entry["lname"],entry["fname"],"","","","",""]);
                            $scope.popIds.push(entry["id"]);
                            //TODO: need a better way to fill in missing info
                        }
                    });

                    // Empty the modal
                    $scope.popEntryData="";

                    // Set the Template tab as viewable
                    UserView.setViewable("Template");
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

    // Focus on the textarea when the modal is shown 
    $('#add-population-modal').on('shown', function() {
        $('#add-population-modal textarea').focus();
    })
  });

