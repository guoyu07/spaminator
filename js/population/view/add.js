define([
    'underscore',
    'backbone',
    'text!population/template/add.html',
    'jquery-ui',
], function(_, Backbone, AddTemplate) {
    return Backbone.View.extend({
        template: _.template(AddTemplate),
        events: {
            'click .population-entry-done':   'doAdd',
            'click .population-entry-cancel': 'cancelAdd',
            'remove': 'cleanup',
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
            alert($('.population-entry-text', this.$el).val());
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
