define([
    'jquery',
    'underscore',
    'backbone',
    'text!spaminator/template/layout.html',
    'text!spaminator/template/welcome.html',
    'template/view/main'
], function($, _, Backbone, LayoutTemplate, WelcomeTemplate, TemplateView) {
    var MainView = Backbone.View.extend({
        el: $('#spaminator'),

        events: {
            'click #get-started': 'showTemplateView',
        },

        initialize: function() {
            this.layoutTemplate  = _.template(LayoutTemplate);
            this.welcomeTemplate = _.template(WelcomeTemplate);
        },
        
        render: function() {
            this.$el.html(this.layoutTemplate({}));
            $('#welcome', this.$el).html(this.welcomeTemplate({}));
        },

        showTemplateView: function() {
            if(this.templateView) return;

            this.templateView = new TemplateView({el: $('#template', this.$el)});
            this.templateView.render();
        },
    });

    return MainView;
});
