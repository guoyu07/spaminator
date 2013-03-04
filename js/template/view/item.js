define([
    'jquery',
    'underscore',
    'backbone',
    'template/model/item',
    'text!template/template/list-item.html',
], function($, _, Backbone, TemplateItem, ListItemTemplate) {
    var ListItem = Backbone.View.extend({
        template: _.template(ListItemTemplate),
        events: {
            'click': 'select',
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        select: function(e) {
            console.log('Selected: ' + this.model.name);
        },
    });

    return ListItem;
});
