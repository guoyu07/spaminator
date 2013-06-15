define([
    'jquery',
    'underscore',
    'backbone',
    'template/config',
    'template/model/item',
], function($, _, Backbone, Config, TemplateItem) {
    var TemplateList = Backbone.Collection.extend({
        model: TemplateItem,
        url: function() {
            return Config.templateUri;
        },
    });

    return TemplateList;
});
