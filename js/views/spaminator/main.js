define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/spaminator/welcome.html',
    'views/template/main'
], function($, _, Backbone, WelcomeTemplate, TemplateView) {
    var MainView = Backbone.View.extend({
        el: $('#spaminator'),

        events: {
            'click #get-started': 'showTemplate',
        },
        
        render: function() {
            var welcomeRendered = _.template(WelcomeTemplate, {});
            this.$el.append(welcomeRendered);
        },

        showTemplate: function() {
            var templateHolder = $('<div id="templateView">');
            this.$el.append(templateHolder);
            var templateView = new TemplateView({el: templateHolder});
            templateView.render();

            $('html,body').animate({
                scrollTop: templateHolder.offset().top,
            }, 1000);
        },
    });

    return MainView;
});
