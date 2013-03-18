define([
    'underscore',
    'backbone',
    'text!spaminator/review/template/member.html',
], function(_, Backbone, MemberTemplate) {
    return Backbone.View.extend({
        template: _.template(MemberTemplate),
        el: 'li',
        initialize: function() {
            this.listenTo(this.model, 'change',  this.render);
            this.listenTo(this.model, 'sync',    this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
//            console.log(this.model);
            this.template(this.model.toJSON());
            this.$el.addClass('population-member');
            return this;
        },
    });
});
