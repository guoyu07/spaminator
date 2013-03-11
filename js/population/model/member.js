define([
    'backbone',
], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            'firstName':  '',
            'middleName': '',
            'lastName':   '',
            'prefix':     '',
            'suffix':     '',
            'username':   '',
            'email':      '',
            'error':      '',
        },
    });
});
