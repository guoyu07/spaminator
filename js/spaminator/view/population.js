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
            if(collection.length > 0) {
                this.enableNext();
            } else {
                this.disableNext();
            }
        },
    });
});
