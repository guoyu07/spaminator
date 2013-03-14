define([
    'underscore',
    'backbone',
    'spaminator/view/abstract-subview',
    'text!spaminator/template/review.html',
], function(_, Backbone, AbstractSubview, ReviewTemplate) {
    return AbstractSubview.extend({
        template: _.template(ReviewTemplate),
        initialize: function() {
        },
        render: function() {
            this.$el.html(this.template());
            this.initNext();
            this.enableNext();
        },
    });
});
