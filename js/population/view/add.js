define([
    'underscore',
    'backbone',
    'population/model/population',
    'text!population/template/add.html',
    'jquery-ui',
], function(_, Backbone, Population, AddTemplate) {
    return Backbone.View.extend({
        template: _.template(AddTemplate),
        events: {
            'click .population-entry-done':   'doAdd',
            'click .population-entry-cancel': 'cancelAdd',
            'remove': 'cleanup',
        },
        initialize: function(options) {
            this.population = options.population;
        },
        render: function() {
            var compiledTemplate = this.template({});
            this.$el.html(this.template({})).dialog({
                height: '500',
                width: '600',
                title: 'Add Members to Population',
                dialogClass: 'population-entry-popup',
            });
            return this;
        },
        doAdd: function(e) {
            this.population.set('members', $('.population-entry-text', this.$el).val());

            this.population.save();
            this.remove();
        },
        cancelAdd: function(e) {
            this.remove();
        },
        cleanup: function() {
            this.$el.dialog('destroy');
            this.$el.children().remove();
        },
    });
});
