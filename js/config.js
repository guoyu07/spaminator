require.config({
    paths: {
        'jquery':     'libs/jquery',
        'jquery-ui':  'libs/jquery-ui',
        'underscore': 'libs/underscore',
        'backbone':   'libs/backbone',
        'marionette': 'libs/marionette',
        'bootstrap':  'libs/bootstrap',
        'require':    'libs/require/require',
        'text':       'libs/require/text',
        'ckeditor':   'libs/ckeditor/ckeditor',
        'libess':     'libs/ess/libess',
    },

    shim: {
        'bootstrap': ["jquery"],
        'backbone': {
            deps: ["underscore", "jquery"],
            exports: "Backbone",
        },
        'jquery-ui': {
            deps: ["jquery"],
        },
        'underscore': {
            exports: "_",
        },
        'marionette': {
            deps: ["backbone"],
            exports: "Backbone.Marionette",
        },
        'ckeditor': {
            exports: "CKEDITOR",
            init: function() {
                this.CKEDITOR_BASEPATH = 'js/libs/ckeditor/';
                return this.CKEDITOR;
            }
        },
    },
});
