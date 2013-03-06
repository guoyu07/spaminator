define([
    'jquery',
    'underscore',
    'backbone',
    'ckeditor',
    'template/model/item',
    'text!template/template/editor.html',
], function($, _, Backbone, ckeditor, TemplateItem, EditorTemplate) {
    var EditorView = Backbone.View.extend({
        template: _.template(EditorTemplate),
        events: {
            'keyup #template-title': 'titleChanged',
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$content = $('#template-content', this.$el);

            this.ck = ckeditor.replace(this.$content.get(0));

            this.ck.on('change', this.bodyChanged, this);

            return this;
        },
        titleChanged: function(e) {
            this.model.set('title', $('#template-title', this.$el).val());
        },
        bodyChanged: function(e) {
            this.model.set('content', this.ck.getData());
        },
        hasChanged: function(e) {
            if(!this.ck) return;
        },
    });

    return EditorView;
});
