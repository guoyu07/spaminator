define([
    'jquery',
    'underscore',
    'backbone',
    'views/spaminator/main',
], function($, _, Backbone, MainView, WelcomeView, TemplateLayout) {
    var SpaminatorRouter = Backbone.Router.extend({
        routes: {
            '*path':               'showMain',
        },
        showMain: function(path) {
            if(!this._mainView) {
                this._mainView = new MainView();
                this._mainView.render();
            }
        },

        _welcomeView: null,
    });

    var initialize = function() {
        var router = new SpaminatorRouter;

        Backbone.history.start();
    };

    return {
        initialize: initialize,
    };
});
