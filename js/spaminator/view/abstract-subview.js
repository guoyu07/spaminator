/**
 * When you extend this, you may do a few things:
 *
 * 1. If you WANT a subview, in your initialize function:
 *        initialize = function() {
 *            this.subview = new MyFancySubview();
 *            ...
 *        }
 * 2. You will need some kind of event handler that enables and disables
 *    the 'next' button based on things that happen within the subview:
 *        initialize = function() {
 *            ...
 *            this.listenTo(this.subview, 'somethingHappened', this.updateNext);
 *        },
 *        ...
 *        updateNext = function() {
 *            if(someCondition) {
 *                this.enableNext();   // Enables the 'next' button
 *            } else {
 *                this.disableNext();  // Disables the 'next' button
 *            }
 *        }
 * 3. The 'next' button is disabled by default, use this.enableNext() and
 *    this.disableNext() wherever you'd like to control the behavior of this
 *    button
 * 4. IFF you override render(), and you're interested in subviews, you will need
 *    to call this.initNext() within your render function.  If you don't override
 *    render(), it will just happen for you.
 * 5. IFF you override render() and are interested in a subview, you will need to
 *    call this.renderSubview() within your render function.  If you don't
 *    override render(), it will just happen for you, but only if this.subview is
 *    set.
 *
 * To gain all the nice functionality of this class, your template will need:
 *
 * 1. A div with ID 'spaminator-subview' where the subview contents will be rendered.
 * 2. One or more Bootstrap buttons/<a>/whatever with class 'spaminator-next' that
 *    will flip to the next page.
 *
 */

define([
    'underscore',
    'backbone',
], function(_, Backbone) {
    return Backbone.View.extend({
        render: function() {
            this.$el.html(this.template());
            if(this.subview) this.renderSubview();
            this.initNext();
        },
        renderSubview: function() {
            this.$subview = $('#spaminator-subview', this.$el);
            this.subview.setElement(this.$subview);
            this.subview.render();
        },
        initNext: function() {
            this.$next = $('.spaminator-next', this.$el);
            this.$next.addClass('disabled');
        },
        enableNext: function() {
            this.$next.removeClass('disabled').addClass('btn-success');
        },
        disableNext: function() {
            this.$next.addClass('disabled').removeClass('btn-success');
        },
    });
});
