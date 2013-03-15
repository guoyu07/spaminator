define([
    'backbone',
], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            loaded:        false,
            authenticated: false,
            senderName:    '',
            senderEmail:   '',
            permission: {
                spaminate:     true,
                changePersona: false,
                changeName:    false,
            },
            selectedPopulation: null,
            selectedTemplate:   null,
        },
        parse: function(response, options) {
            this.set('loaded', true);
            return response;
        },
    });
});
