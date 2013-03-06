define([
    'jquery',
    'underscore',
    'backbone',
    'template/collection/templatelist',
    'template/model/item',
    'template/view/item',
    'template/view/editor',
    'template/view/view',
    'text!template/template/layout.html',
    'text!template/template/loading.html',
], function($, _, Backbone, TemplateList, TemplateItem, ListItemView, EditorView, TemplateView, layoutTemplate, loadingTemplate) {
    var TemplateLayoutView = Backbone.View.extend({
        initialize: function() {
            this.layout  = _.template(layoutTemplate);
            this.loading = _.template(loadingTemplate);

            this.collection = new TemplateList();

            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
        },
        events: {
            'click #template-new': 'newTemplate',
            'click #template-edit': 'editTemplate',
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
            $('#template-list', this.$el).prepend(view.render().el);
        },
        addAll: function() {
            $('#template-list', this.$el).empty();
            this.collection.each(this.addOne, this);
        },
        select: function(model) {
            // If editing, save changes
            if(this.mainView && this.mainView.hasChanged) {
                if(this.mainView.hasChanged()) {
                    this.mainView.saveChanges();
                    this.selected.sync();
                }
            }

            if(this.selected) this.selected.set('active', false);
            this.selected = model;
            this.selected.set('active', true);

            if(this.mainView) this.mainView.remove();

            this.mainView = new TemplateView({
                model: model,
//                el: $('#template-view', this.$el),
            });
            $('#template-view', this.$el).html(this.mainView.render().$el);
        },
        newTemplate: function(e) {
            if(e) e.preventDefault();
            var tpl = new TemplateItem({
                saved: false
            });
            this.collection.add(tpl);
            this.select(tpl);
            this.editTemplate();
        },
        editTemplate: function(e) {
            if(e) e.preventDefault();
            if(!this.selected) return;

            this.mainView.remove();
            this.mainView = new EditorView({
                model: this.selected,
            });
            $('#template-view', this.$el).html(this.mainView.render().$el);
        },
    });

    return TemplateLayoutView;
});
