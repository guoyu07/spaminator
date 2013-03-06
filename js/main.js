require.config({
    paths: {
        'jquery':     'libs/jquery/jquery',
        'jquery-ui':  'libs/jquery/jquery-ui',
        'underscore': 'libs/underscore/underscore',
        'backbone':   'libs/backbone/backbone',
        'bootstrap':  'libs/bootstrap/bootstrap',
        'require':    'libs/require/require',
        'text':       'libs/require/text',
        'rangy':      'libs/rangy/rangy-core',
        'ckeditor':   'libs/ckeditor/ckeditor',
        'libess':     'libs/ess/libess',
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
        ckeditor: {
            exports: "CKEDITOR",
            init: function() {
                this.CKEDITOR_BASEPATH = 'js/libs/ckeditor/';
                return this.CKEDITOR;
            }
        },
    },
});

require([
    'spaminator/spaminator',
    'ckeditor',
], function(Spaminator) {
    Spaminator.initialize();
});
