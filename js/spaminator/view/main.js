define([
    'jquery',
    'underscore',
    'backbone',
    'text!spaminator/template/layout.html',
    'text!spaminator/template/welcome.html',
    'template/view/main',
    'population/view/main',
], function($, _, Backbone, LayoutTemplate, WelcomeTemplate, TemplateView, PopulationView) {
    var MainView = Backbone.View.extend({
        el: $('#spaminator'),

        events: {
            'click #get-started': 'showTemplateView',
//            'click #get-started': 'showPopulationView',
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

            $('#get-started', this.$el).remove();
            this.templateView = new TemplateView({el: $('#template', this.$el)});
            this.templateView.render();
        },

        showPopulationView: function() {
            if(this.populationView) return;
            $('#get-started', this.$el).remove();
            this.populationView = new PopulationView({el: $('#population', this.$el)});
            this.populationView.render();
        },
    });

    return MainView;
});
