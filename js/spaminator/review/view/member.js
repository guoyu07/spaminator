define([
    'underscore',
    'backbone',
    'text!spaminator/review/template/member.html',
], function(_, Backbone, MemberTemplate) {
    return Backbone.View.extend({
        template: _.template(MemberTemplate),
        el: '<li>',
        events: {
            'click': 'select',
        },
        initialize: function() {
            this.listenTo(this.model, 'change',  this.render);
            this.listenTo(this.model, 'sync',    this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            console.log(this.model.toJSON());
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.addClass('population-member');
            return this;
        },
        select: function(e) {
            if(e) { e.preventDefault(); }
            this.trigger('select', this);
        }
    });
});
