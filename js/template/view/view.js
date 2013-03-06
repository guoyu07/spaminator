define([
    'jquery',
    'underscore',
    'backbone',
    'template/model/item',
    'text!template/template/view.html',
], function($, _, Backbone, TemplateItem, ViewTemplate) {
    var TemplateView = Backbone.View.extend({
        template: _.template(ViewTemplate),
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
    });

    return TemplateView;
});
