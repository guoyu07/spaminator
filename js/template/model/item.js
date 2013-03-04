define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {
    var TemplateItem = Backbone.Model.extend({
        defaults: function() {
            return {
                title: 'Empty Template',
                active: false,
                modified: 'Never',
            };
        },
    });

    return TemplateItem;
});
