require.config({
    paths: {
        jquery:     'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone:   'libs/backbone/backbone',
        bootstrap:  'libs/bootstrap/bootstrap',
        require:    'libs/require/require',
        text:       'libs/require/text',
    },

    shim: {
        bootstrap: ["jquery"],
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone",
        },
        underscore: {
            exports: "_",
        },
    },
});

require([
    'spaminator',
], function(Spaminator) {
    Spaminator.initialize();
});
