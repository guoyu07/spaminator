'use strict';

angular.module('spaminatorApp')
  .controller('PopulationCtrl', function ($scope, UserView, $http, $location) {
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

    
    var data = "900458187\t900294976\n900325006";
    //console.log($location.path());
    
    //$http({method: 'POST', url:"http://localhost:9000/scripts/getPopulation.php"})
    $http.post("scripts/getPopulation.php", data)
        .success(function(data, status, headers, config) {
            console.log("SUCCESS------------------------------");
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
            
            $scope.population.push(["123456789","Potter","Harry","James","","","potterhj","potterhj@hogwarts.edu"]);
            data.forEach(function(entry) {
                //console.log(entry);
                $scope.population.push([entry["id"],entry["lname"],entry["fname"],"","","","",""]);
                //TODO: need a better way to fill in missing info
            });
        })
        .error(function(data, status, headers, config) {
            console.log("ERROR--------------------------------");
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
            //alert("FAILURE" + "\nData: " + data + "\nStatus: " + status);
        });
  });
