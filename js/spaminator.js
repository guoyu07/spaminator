define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',
], function($, _, Backbone, Bootstrap, Router){
    var initialize = function() {
        $('#spaminator').css({
            'margin-bottom': $('#footer').outerHeight(true),
        });
        Router.initialize();
    }

    return {
        initialize: initialize
    };
});
