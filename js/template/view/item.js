define([
    'jquery',
    'underscore',
    'backbone',
    'template/model/item',
    'text!template/template/list-item.html',
], function($, _, Backbone, TemplateItem, ListItemTemplate) {
    var ListItemView = Backbone.View.extend({
        template: _.template(ListItemTemplate),
        tagName: 'li',
        events: {
            'click': 'select',
        },
        initialize: function() {
            this.listenTo(this.model, 'change',  this.render);
            this.listenTo(this.model, 'sync',    this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            if(this.model.isDirty()) {
                $('.template-unsaved', this.$el).show();
            } else {
                $('.template-unsaved', this.$el).hide();
            }
            return this;
        },
        select: function(e) {
            if(e) e.preventDefault();
            this.trigger('select', this);
        },
        setActive: function() {
            this.$el.addClass('active');
        },
        setInactive: function() {
            this.$el.removeClass('active');
        },
    });

    return ListItemView;
});
