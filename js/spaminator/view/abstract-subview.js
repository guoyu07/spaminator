/**
 * When you extend this, you may do a few things:
 *
 * 1. If you WANT a subview, in your initialize function:
 *        initialize = function() {
 *            this.subview = new MyFancySubview();
 *            ...
 *        }
 * 2. You MUST provide a function that determines whether or not the 'next'
 *    button should be enabled, and it must be called this.updateNext().  It
 *    takes no parameters but should call this.enableNext() and this.disableNext()
 *    appropriately.  It may be the case that it just calls this.enableNext()
 *    becuase there is no case in which the 'next' button should be disabled,
 *    and that is fine.  You may also call this yourself on event handlers, for
 *    instance your subview probably provides an onChange event of some kind, and
 *    it could call updateNext directly.  For example:
 *        initialize = function() {
 *            ...
 *            this.listenTo(this.subview, 'somethingHappened', this.updateNext);
 *        },
 *        ...
 *        updateNext = function() {
 *            if(someCondition) {
 *                // Enable the 'next' button:
 *                this.enableNext();
 *            } else {
 *                // Disable the 'next' button, with title and content for
 *                // popover:
 *                this.disableNext('Missing Data',
 *                    'Please provide the missing data');
 *            }
 *        }
 * 3. The 'next' button is disabled by default, use this.enableNext() and
 *    this.disableNext() wherever you'd like to control the behavior of this
 *    button
 * 4. You MUST provide a Title and Content for a bootstrap popover when you
 *    disableNext.
 * 4. IFF you override render(), and you're interested in subviews, you will need
 *    to call this.initNext() within your render function.  If you don't override
 *    render(), it will just happen for you.
 * 5. IFF you override render() and are interested in a subview, you will need to
 *    call this.renderSubview() within your render function.  If you don't
 *    override render(), it will just happen for you, but only if this.subview is
 *    set.
 * 6. If you are interested in the persona, override setPersona and give it a
 *    listenTo.
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
    'bootstrap',
], function(_, Backbone) {
    return Backbone.View.extend({
        initialize: function(persona, spamination) {
            this.persona = persona;
            this.spamination = spamination;
        },
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
            this.updateNext();
        },
        enableNext: function() {
            if(!this.$next) return;

            this.$next.removeClass('disabled').addClass('btn-success');
            this.$next.popover('destroy');
        },
        disableNext: function(title, content) {
            if(!this.$next) return;

            this.$next.addClass('disabled').removeClass('btn-success');

            this.$next.popover({
                trigger: 'hover',
                title: title,
                content: content,
            });
        },
    });
});
