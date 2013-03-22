define([
    'underscore',
    'backbone',
    'spaminator/view/abstract-subview',
    'spaminator/review/view/member',
    'text!spaminator/template/review.html',
], function(_, Backbone, AbstractSubview, MemberView, ReviewTemplate) {
    return AbstractSubview.extend({
        template: _.template(ReviewTemplate),
        hasTested: false,
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

            this.$population = $('.review-population', this.$el);
            var population = this.persona.get('selectedPopulation');
            if(population) {
                this.$population.empty();
                population.each(function(model) {
                    var view = new MemberView({
                        model: model,
                    });
                    this.$population.append(view.render().el);
                    view.on('select', this.renderEmail, this);
                }, this);
            }

            this.$unsent = $('.review-unsent-email', this.$el);
            this.initNext();
        },
        updateNext: function() {
            var next = $('.spaminator-next', this.$el);

            var population = this.persona.get('selectedPopulation');
            if(!population || population.length < 1) {
                this.disableNext('Missing Population', 'Your recipient population is empty.  Please select "population" from the menu at the top of the page to add members.');
            }

            if(!this.persona.get('selectedTemplate')) {
                this.disableNext('Missing Template', 'You did not select a template.  Please click "template" from the menu at the top of the page to select or create a template.');
            }

            if(!this.hasTested) {
                this.disableNext('Untested Spamination', 'Please send a test email to yourself first.');
                return;
            } else {
                this.$unsent.remove();
            }

            this.enableNext();
        },
        sendTest: function(e) {
            if(e) { e.preventDefault(); e.stopPropagation(); }
            this.hasTested = true;
        },
        renderEmail: function(e) {
        },
    });
});
