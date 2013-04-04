define([
    'underscore',
    'backbone',
    'spaminator/view/abstract-subview',
    'spaminator/review/view/member',
    'text!spaminator/template/review.html',
], function(_, Backbone, AbstractSubview, MemberView, ReviewTemplate) {
    return AbstractSubview.extend({
        template: _.template(ReviewTemplate),
        render: function() {
            var from = false;
            if(this.spamination.get('senderName') && this.spamination.get('senderEmail')) {
                from = this.spamination.get('senderName') + " <" + this.spamination.get('senderEmail') + ">";
            }

            var subject = null;
            var template = this.spamination.get('templateDataSource');
            if(template) {
                subject = template;
            }

            this.$el.html(this.template({
                from: from ? from : 'No Sender Selected!',
                subject: subject ? subject : 'No Template Selected!',
            }));

            this.$population = $('.review-population', this.$el);
            var population = this.spamination.get('populationDataSource');
            if(population) {
                this.$population.append(population);
                /*                this.$population.empty();
                population.each(function(model) {
                    var view = new MemberView({
                        model: model,
                    });
                    this.$population.append(view.render().el);
                    view.on('select', this.renderEmail, this);
                }, this);*/
            }

            this.$unsent = $('.review-unsent-email', this.$el);
            this.initNext();
        },
        updateNext: function() {
            var next = $('.spaminator-next', this.$el);

            var population = this.spamination.get('selectedPopulation');
            if(!population) {
                this.disableNext('Missing Population', 'Your recipient population is empty.  Please select "population" from the menu at the top of the page to add members.');
            }

            if(!this.spamination.get('selectedTemplate')) {
                this.disableNext('Missing Template', 'You did not select a template.  Please click "template" from the menu at the top of the page to select or create a template.');
            }

            if(!this.spamination.hasTested) {
                this.disableNext('Untested Spamination', 'Please send a test email to yourself first.');
                return;
            } else {
                this.$unsent.remove();
            }

            this.enableNext();
        },
        sendTest: function(e) {
            if(e) { e.preventDefault(); e.stopPropagation(); }
            this.spamination.hasTested = true;
        },
        renderEmail: function(e) {
        },
    });
});
