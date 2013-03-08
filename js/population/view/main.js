define([
    'underscore',
    'backbone',
    'population/model/member',
    'population/collection/member',
    'population/view/member',
    'population/view/add',
    'text!population/template/list.html',
    'jquery-ui',
], function(_, Backbone, Member, MemberCollection, MemberView, AddView, ListTemplate) {
    return Backbone.View.extend({
        template: _.template(ListTemplate),
        events: {
            'click .population-add':          'showAdd',
        },
        initialize: function() {
        },
        render: function() {
            this.$el.html(this.template({}));

            this.$memberlist      = $('.population-member-list', this.$el);
            this.$memberlistempty = $('.population-member-list-empty', this.$el);
        },
        showAdd: function() {
            this.$el.append('<div id="population-popup">');
            var popup = new AddView({el: $('#population-popup', this.$el)});
            popup.render();
        },
    });
});
