define([
    'jquery',
    'underscore',
    'backbone',
    'template/collection/templatelist',
    'template/model/item',
    'template/view/item',
    'template/view/editor',
    'text!template/template/layout.html',
    'text!template/template/loading.html',
], function($, _, Backbone, TemplateList, TemplateItem, ListItemView, EditorView, layoutTemplate, loadingTemplate) {
    var TemplateView = Backbone.View.extend({
        initialize: function() {
            this.layout  = _.template(layoutTemplate);
            this.loading = _.template(loadingTemplate);

            this.collection = new TemplateList();

            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
        },
        render: function() {
            this.$el.html(this.layout({}));

            $('#template-list', this.$el).html(this.loading({title: 'templates'}));

            this.collection.fetch();
        },
        addOne: function(model) {
            var view = new ListItemView({
                model: model,
            });
            view.on('select', this.select, this);
            $('#template-list', this.$el).append(view.render().el);
        },
        addAll: function() {
            $('#template-list', this.$el).empty();
            var newTemplate = new TemplateItem({
                'active':   true,
                'title':    '<strong>New Template...</strong>',
                'modified': 'Never',
                'content':  '',
                'blank':    true,
            });
            this.addOne(newTemplate);
            this.collection.each(this.addOne, this);
            this.select(newTemplate);
        },
        select: function(model) {
            if(this.selected) this.selected.set('active', false);
            this.selected = model;
            
            if(this.edtiorView) this.editorView.remove();
            this.editorView = new EditorView({
                model: model,
                el: $('#template-view', this.$el)
            });
            this.editorView.render();
        },
    });

    return TemplateView;
});
