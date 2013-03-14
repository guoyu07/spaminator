define([
    'jquery',
    'underscore',
    'backbone',
    'ckeditor',
    'template/config',
    'template/model/item',
    'text!template/template/editor.html',
], function($, _, Backbone, ckeditor, Config, TemplateItem, EditorTemplate) {
    var EditorView = Backbone.View.extend({
        template: _.template(EditorTemplate),
        events: {
            'keyup #template-title': 'titleChanged',
            'blur #template-title': 'saveModel',
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$content = $('#template-content', this.$el);
            this.$save    = $('.template-editor-save', this.$el);
            this.$unsaved = $('.template-editor-unsaved', this.$el);
            this.$saved   = $('.template-editor-saved', this.$el);
            this.$saving  = $('.template-editor-saving', this.$el);
            this.$spinner = $('.icon-spinner', this.$el);

            this.ck = ckeditor.replace(this.$content.get(0));

            this.ck.on('change', this.bodyChanged, this);
            this.ck.on('blur', this.saveModel, this);

            this.model.on('sync', this.savedState, this);

            this.savedState();

            return this;
        },
        saveModel: function(e) {
            this.savingState();
            var me = this;
            this.model.save({success: function() {
                me.savedState();
            }});
        },
        titleChanged: function(e) {
            this.model.set('title', $('#template-title', this.$el).val());
            this.unsavedState();
        },
        bodyChanged: function(e) {
            this.model.set('content', this.ck.getData());
            this.unsavedState();
        },
        hasChanged: function(e) {
            if(!this.ck) return;
        },
        savedState: function() {
            this.$saving.hide();
            this.$unsaved.hide();
            this.$saved.show();
            this.$save.addClass('disabled');
        },
        savingState: function() {
            this.$saving.show();
            this.$unsaved.hide();
            this.$saved.hide();
            this.$save.addClass('disabled');
        },
        unsavedState: function() {
            this.$saving.hide();
            this.$unsaved.show();
            this.$saved.hide();
            this.$save.removeClass('disabled');
        },
    });

    return EditorView;
});
