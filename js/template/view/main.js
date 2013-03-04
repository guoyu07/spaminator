define([
    'jquery',
    'underscore',
    'backbone',
    'text!template/template/layout.html',
    'text!template/template/loading.html'
], function($, _, Backbone, layoutTemplate, loadingTemplate, listItemTemplate, editorTemplate) {
    var TemplateView = Backbone.View.extend({
        el: $('.container'),
        render: function() {
            var compiledTemplate = _.template(layoutTemplate, {});
            this.$el.append(compiledTemplate);
            $this = this;

            var loading = _.template(loadingTemplate, {title: 'Templates'});
            $listLoading = $(loading);
            this.$el.find('#template-list').append($listLoading);

            var listItem = _.template(listItemTemplate);

            $.ajax('/spaminator/data/template-list.json', {
                complete: function(jqXHR, textStatus) {
                    $listLoading.remove();
                },
                success: function(data, textStatus, jqXHR) {
                    for(resultKey in data) {
                        console.log(data[resultKey]);
                        console.log(listItem(data[resultKey]));
                        $this.$el.find('#template-list').append(listItem(data[resultKey]));
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                    $listLoading.parent().replaceWith('An error occurred getting template list');
                },
            });
        },
    });

    return TemplateView;
});
