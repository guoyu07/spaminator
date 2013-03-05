define([
    'jquery',
    'underscore',
    'backbone',
    'template/model/item',
], function($, _, Backbone, TemplateItem) {
    var TemplateList = Backbone.Collection.extend({
        model: TemplateItem,
        url: 'data/index.php/template-list.json',
        parse: function(response) {
            _.each(response, function(herp) {
                herp.active = false;
            });
            return response;
        }
    });

    return TemplateList;
});
