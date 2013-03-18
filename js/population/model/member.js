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
        formatRecipient: function() {
            return this.get('firstName') + ' ' + this.get('lastName') + ' <' + this.get('email') + '>';
        },
    });
});
