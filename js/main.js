require.config({
    paths: {
        'jquery':     'libs/jquery',
        'jquery-ui':  'libs/jquery-ui',
        'underscore': 'libs/underscore',
        'backbone':   'libs/backbone',
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
        'ckeditor': {
            exports: "CKEDITOR",
            init: function() {
                this.CKEDITOR_BASEPATH = 'js/libs/ckeditor/';
                return this.CKEDITOR;
            }
        },
        'spin': {
            exports: "Spinner",
        },
    },
});

require(['spaminator/main'], function(Spaminator) {
    Spaminator.initialize($('#spaminator-container'));
});
