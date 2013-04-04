define([
    'backbone',
    'spaminator/config',
], function(Backbone, Config) {
    return Backbone.Model.extend({
        urlRoot: Config.personaSource,
        defaults: {
            loaded:        false,
            authenticated: false,
            firstname:     '',
            lastname:      '',
            email:         '',
            permission: {
                spaminate:     true,
                changePersona: false,
                changeName:    false,
            },
        },
        parse: function(response, options) {
            this.set('loaded', true);
            return response;
        },
    });
});
