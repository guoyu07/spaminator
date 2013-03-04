define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/template/layout.html'
], function($, _, Backbone, layoutTemplate) {
    var TemplateView = Backbone.View.extend({
        el: $('.container'),
        render: function() {
            var compiledTemplate = _.template(layoutTemplate, {});
            this.$el.append(compiledTemplate);
        },
    });

    return TemplateView;
});
