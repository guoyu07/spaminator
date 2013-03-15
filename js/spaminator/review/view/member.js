define([
], function() {
    return Backbone.View.extend({
        el: 'li',
        initialize: function() {
            this.listenTo(this.model, 'change',  this.render);
            this.listenTo(this.model, 'sync',    this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.$el.text(this.model.formatRecipient());
            this.addClass('population-member');
            return this;
        },
    });
});
