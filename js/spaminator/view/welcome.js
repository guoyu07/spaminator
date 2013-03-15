define([
    'underscore',
    'backbone',
    'spaminator/view/abstract-subview',
    'text!spaminator/template/welcome.html',
], function(_, Backbone, AbstractSubview, WelcomeTemplate) {
    return AbstractSubview.extend({
        template: _.template(WelcomeTemplate),
        render: function() {
            this.$el.html(this.template());

            this.$loading = $('.spaminator-welcome-loading',         this.$el).hide();
            this.$unauthn = $('.spaminator-welcome-unauthenticated', this.$el).hide();
            this.$unauthz = $('.spaminator-welcome-unauthorized',    this.$el).hide();
            this.$authd   = $('.spaminator-welcome-authorized',      this.$el).hide();

            if(!this.persona || !this.persona.get('loaded')) {
                this.$loading.show();
            } else
            if(!this.persona.get('authenticated')) {
                this.$unauthn.show();
            } else
            if(!this.persona.get('permission').spaminate) {
                this.$unauthz.show();
            } else {
                this.$authd.show();
            }
        },
        updateNext: function() {
            this.enableNext();
        },
        setPersona: function(persona) {
            this.persona = persona;

            this.listenTo(this.persona, 'sync', this.render);
            this.render();
        },
    });
});
