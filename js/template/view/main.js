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
    var TemplateLayoutView = Backbone.View.extend({
        initialize: function() {
            this.layout  = _.template(layoutTemplate);
            this.loading = _.template(loadingTemplate);

            this.collection = new TemplateList();

            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
            this.collection.on('sync', this.notifySync, this);
            this.collection.on('destroy', this.updateEmpty, this);
        },
        events: {
            'click #template-new': 'newTemplate',
//            'click #template-edit': 'editTemplate',
        },
        render: function() {
            this.$el.html(this.layout({}));

            this.$listempty = $('.template-list-empty', this.$el);

            $('#template-list', this.$el).html(this.loading({title: 'templates'}));

            this.collection.fetch();

            if(this.selected) this.select(this.selected);
        },
        addOne: function(model) {
            var view = new ListItemView({
                model: model,
            });
            view.on('select', this.select, this);
            $('#template-list', this.$el).prepend(view.render().el);
            this.updateEmpty();
            this.$listempty.hide();
            if(model.isNew()) {
                this.select(view);
            }
        },
        updateEmpty: function() {
            if(this.collection.length > 0) {
                this.$listempty.hide();
            } else {
                this.$listempty.show();
            }
        },
        addAll: function() {
            $('#template-list', this.$el).empty();
            this.collection.each(this.addOne, this);
        },
        select: function(view) {
            this.saveEditor();

            if(this.selected) this.selected.setInactive();
            this.selected = view;
            this.selected.setActive();

            if(this.mainView) this.mainView.remove();

            this.mainView = new EditorView({
                model: view.model,
            });
            $('#template-view', this.$el).html(this.mainView.render().$el);

            this.trigger('selected', view.model);
        },
        saveEditor: function() {
            // If editing, save changes
            if(this.selected && this.selected.model) {
                if(this.selected.model.isDirty()) {
                    this.selected.model.save();
                }
            }
        },
        notifySync: function(e) {
            if(this.selected && this.selected.model) {
                this.trigger('changed', this.selected.model);
            }
        },
        newTemplate: function(e) {
            if(e) e.preventDefault();
            var tpl = new TemplateItem();
            this.collection.add(tpl);
        },
        getSelectedTemplate: function() {
            if(this.selected && this.selected.model) {
                return this.selected.model;
            } else return undefined;
        },
    });

    return TemplateLayoutView;
});
