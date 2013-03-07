define([
    'underscore',
    'backbone',
    'population/model/member',
    'population/collection/member',
    'population/view/member',
    'text!population/template/list.html',
    'jquery-ui',
], function(_, Backbone, Member, MemberCollection, MemberView, ListTemplate) {
    return Backbone.View.extend({
        template: _.template(ListTemplate),
        events: {
            'click .population-add':          'showAdd',
            'click #population-entry-cancel': 'cancelAdd',
            'click #population-entry-done':   'doAdd',
        },
        initialize: function() {
        },
        render: function() {
            this.$el.html(this.template({}));

            this.$memberlist      = $('#population-member-list', this.$el);
            this.$memberlistempty = $('#population-member-list-empty', this.$el);
            this.$entrydialog     = $('#population-entry-dialog', this.$el);
            this.$entrytext       = $('#population-entry-text', this.$el);

            this.$entrydialog.hide();
//            this.collection.fetch();
        },
        showAdd: function() {
            this.$entrydialog.dialog({
                height: '500',
                width: '600',
                title: 'Add Members to Population',
            });
        },
        cancelAdd: function() {
            this.$entrytext.val('');
            this.$entrydialog.dialog('close');
        },
        doAdd: function() {
            alert(this.$entrytext.val());
        },
    });
});