define([
    'jquery',
    'underscore',
    'backbone',
    'template/model/item',
], function($, _, Backbone, TemplateItem) {
    var TemplateList = Backbone.Collection.extend({
        model: TemplateItem,
        localStorage: new Backbone.LocalStorage("template-list"),
    });

    return TemplateList;
});
