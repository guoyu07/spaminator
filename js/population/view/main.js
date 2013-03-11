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
        },
        render: function() {
            this.$el.html(this.template({}));

            this.$memberlist      = $('.population-member-list', this.$el);
            this.$memberlistempty = $('.population-member-list-empty', this.$el);
            this.$nextstep        = $('.population-next-step', this.$el);

            this.$nextstep.addClass('disabled');

            this.population.collection.on('add', this.addOne, this);
            this.population.collection.on('reset', this.addAll, this);
            this.population.collection.on('sync', this.addAll, this);
        },
        addOne: function(model) {
            var el = $('<tr>');
            this.$memberlistempty.hide();
            this.$memberlist.append(el);

            this.$nextstep.removeClass('disabled');

            var view = new MemberView({
                model: model,
                el: el,
            });
            view.render();
        },
        addAll: function() {
            $('.population-member-list', this.$el).empty();
            this.$memberlistempty.show();
            this.$nextstep.addClass('disabled');
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
    });
});
