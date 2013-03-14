define([
    'backbone',
], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            'bannerId':   '',
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
