define([
    'underscore',
    'backbone',
    'spaminator/view/abstract-subview',
    'text!spaminator/template/review.html',
], function(_, Backbone, AbstractSubview, ReviewTemplate) {
    return AbstractSubview.extend({
        template: _.template(ReviewTemplate),
        tested: false,
        render: function() {
            var from = this.persona.get('senderName') + " <" + this.persona.get('senderEmail') + ">";

            var subject = null;
            var template = this.persona.get('selectedTemplate');
            if(template) {
                subject = template.get('title');
            }

            this.$el.html(this.template({
                from: from ? from : 'No Sender Selected!',
                subject: subject ? subject : 'No Template Selected!',
            }));

            this.$unsent = $('.review-unsent-email', this.$el);
            this.initNext();
        },
        updateNext: function() {
            var next = $('.spaminator-next', this.$el);

            if(!this.persona.get('selectedTemplate') || !this.persona.get('selectedPopulation')) {
                this.disableNext('Missing Envelope Data', 'Please check thie Message Envelope settings and fill in the missing data.');
                return;
            }

            if(!this.hasTested()) {
                this.disableNext('Untested Spamination', 'Please send a test email to yourself first.');
                return;
            } else {
                this.$unsent.remove();
            }

            this.enableNext();
        },
        setSender: function(sender) {
            this.sender = sender;
        },
        setTemplate: function(template) {
            this.msgtemplate = template;
        },
        setPopulation: function(population) {
            this.population = population;
        },
        sendTest: function(e) {
            if(e) { e.preventDefault(); e.stopPropagation(); }
            this.tested = true;
            this.render();
        },
        hasTested: function() {
            return this.tested;
        },
    });
});
