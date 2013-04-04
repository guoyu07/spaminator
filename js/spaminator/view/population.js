define([
    'underscore',
    'backbone',
    'spaminator/view/abstract-subview',
    'population/view/main',
    'text!spaminator/template/population.html',
], function(_, Backbone, AbstractSubview, PopulationView, PopulationTemplate) {
    return AbstractSubview.extend({
        template: _.template(PopulationTemplate),
        initialize: function() {
            AbstractSubview.prototype.initialize.apply(this, arguments);

            this.subview = new PopulationView();

            this.listenTo(this.subview, 'popChange', this.updateNext);
        },
        updateNext: function(population) {
            if(!population) population = this.subview.getPopulation();
            if(population && population.length > 0 && population.url) {
                this.persona.set('recipientDataSource', population.url());
                this.enableNext();
            } else {
                this.disableNext('Population is Empty', 'Please provide a set of recipients by creating a population on this page.');
            }
        },
    });
});
