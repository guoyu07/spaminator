define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {
    var TemplateItem = Backbone.Model.extend({
        defaults: {
            'title':    '',
            'modified': 'Right Now',
            'content':  '',
            'saved':    true,
        },
    });

    return TemplateItem;
});
