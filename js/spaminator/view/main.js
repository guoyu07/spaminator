define([
    'underscore',
    'backbone',
    'text!spaminator/template/layout.html',
    'text!spaminator/template/menu.html',
    'text!spaminator/template/welcome.html',
], function(_, Backbone, LayoutTemplate, MenuTemplate, WelcomeTemplate) {
    return Backbone.View.extend({
        template: _.template(LayoutTemplate),
        initialize: function(options) {
        },
        render: function() {
        },
    });
});
