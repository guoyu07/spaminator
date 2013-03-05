define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'spaminator/view/main',
], function($, _, Backbone, Bootstrap, MainView){
    var initialize = function() {
        $('#spaminator').css({
            'margin-bottom': $('#footer').outerHeight(true),
        });
        
        var mainView = new MainView();
        mainView.render();
    }

    return {
        initialize: initialize
    };
});
