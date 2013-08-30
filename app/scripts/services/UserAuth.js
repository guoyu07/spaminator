'use strict';

angular.module('spaminatorApp')
  .service('UserAuth', function () {
    // TODO: implement some logic to determine if the user is logged in, and/or allowed access
    var fname = 'Chris';
    var lname = 'Coley';
    var isLogged = true;
    var isAllowed = true;

    return {
        getFirstName: function() {
            return fname;
        },
        getLastName: function() {
            return lname;
        },
        getFullName: function() {
            return fname + " " + lname;
        },
        isLoggedIn: function() {
            return isLogged;
        },
        isAllowed: function() {
            return (isLogged && isAllowed);
        }
    };
  })
  .service('UserView', function (UserAuth) {
    // TODO: Probably need some logic to determine when these are true/false
    var hasPopulation = false;
    var hasTemplate = false;
    var hasSender = false;
    var hasPreview = false;
    var hasSend = false;
    var hasReport = false;
    var hasHistory = false;

    return {
        setViewable: function(viewName) {
            switch(viewName) {
                case "Population":
                    hasPopulation = true;
                    break;
                case "Template":
                    hasTemplate = true;
                    break;
                case "Sender":
                    hasSender = true;
                    break;
                case "Preview":
                    hasPreview = true;
                    break;
                case "Send":
                    hasSend = true;
                    break;
                case "Report":
                    hasReport = true;
                    break;
                case "History":
                    hasHistory = true;
                    break;
            }
        },
        isViewable: function(viewName) {
            switch(viewName) {
                case "Population":
                    return hasPopulation;
                    break;
                case "Template":
                    return hasTemplate;
                    break;
                case "Sender":
                    return hasSender;
                    break;
                case "Preview":
                    return hasPreview;
                    break;
                case "Send":
                    return hasSend;
                    break;
                case "Report":
                    return hasReport;
                    break;
                case "History":
                    return hasHistory;
                    break;
            }
        }
    };
  });
