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
            this.subview = new PopulationView();

            this.listenTo(this.subview, 'popChange', this.updateNext);
        },
        updateNext: function(collection) {
            if(!collection) collection = this.subview.getCollection();
            if(collection.length > 0) {
                this.persona.set('selectedPopulation', collection);
                this.enableNext();
            } else {
                this.disableNext('Population is Empty', 'Please provide a set of recipients by creating a population on this page.');
            }
        },
    });
});
