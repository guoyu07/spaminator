define([
    'underscore',
    'backbone',
    'population/model/member',
    'population/model/population',
    'population/view/member',
    'population/view/add',
    'text!population/template/list.html',
    'jquery-ui',
], function(_, Backbone, Member, Population, MemberView, AddView, ListTemplate) {
    return Backbone.View.extend({
        template: _.template(ListTemplate),
        events: {
            'click .population-add':          'showAdd',
        },
        initialize: function() {
            this.population = new Population();

            this.population.collection.on('add', this.addOne, this);
            this.population.collection.on('reset', this.render, this);
            this.population.collection.on('sync', this.render, this);

            this.population.collection.on('add', this.changeEmpty, this);
            this.population.collection.on('destroy', this.changeEmpty, this);
        },
        render: function() {
            this.$el.html(this.template());

            this.$memberlist      = $('.population-member-list', this.$el);
            this.$memberlistempty = $('.population-member-list-empty', this.$el);

            this.trigger('popChange', this.population);

            this.addAll();
        },
        changeEmpty: function() {
            if(this.population.collection.length > 0) {
                this.$memberlistempty.hide();
            } else {
                this.$memberlistempty.show();
            }

            this.trigger('popChange', this.population);
        },
        addOne: function(model) {
            var el = $('<tr>');
            this.$memberlist.append(el);

            var view = new MemberView({
                model: model,
                el: el,
            });
            view.render();

            this.trigger('popChange', this.population);
        },
        addAll: function() {
            $('.population-member-list', this.$el).empty();
            this.population.collection.each(this.addOne, this);
        },
        showAdd: function() {
            this.$el.append('<div id="population-popup">');
            var popup = new AddView({
                el: $('#population-popup', this.$el),
                population: this.population,
            });
            popup.render();
        },
        getPopulation: function() {
            return this.population;
        },
    });
});
