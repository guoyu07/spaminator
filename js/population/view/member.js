define([
    'jquery',
    'underscore',
    'backbone',
    'text!population/template/member.html',
], function($, _, Backbone, MemberTemplate) {
    return Backbone.View.extend({
        template: _.template(MemberTemplate),
        events: {
            'click .population-member-delete': 'delete',
        },
        initialize: function() {
            this.listenTo(this.model, 'change',  this.render);
            this.listenTo(this.model, 'sync',    this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            if(this.model.get('error')) {
                this.$el.addClass('error');
            } else {
                this.$el.removeClass('error');
            }
        },
        delete: function(e) {
            if(e) { e.preventDefault(); e.stopPropagation(); }
            this.model.destroy();
        },
    });
});
