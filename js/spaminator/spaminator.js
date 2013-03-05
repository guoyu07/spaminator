define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
], function($, _, Backbone, Bootstrap){
    var initialize = function() {
        $('#spaminator').css({
            'margin-bottom': $('#footer').outerHeight(true),
        });
    }

    return {
        initialize: initialize
    };
});
