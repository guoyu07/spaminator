define([
    'underscore',
    'backbone',
    'text!spaminator/template/welcome.html',
], function(_, Backbone, WelcomeTemplate) {
    return Backbone.View.extend({
        template: _.template(WelcomeTemplate),
        render: function() {
            this.$el.html(this.template());
        },
    });
});
