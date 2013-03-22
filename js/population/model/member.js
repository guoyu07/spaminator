define([
    'backbone',
], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            'bannerId':   '',
            'firstname':  '',
            'middlename': '',
            'lastname':   '',
            'prefix':     '',
            'suffix':     '',
            'username':   '',
            'email':      '',
            'error':      '',
        },
    });
});
