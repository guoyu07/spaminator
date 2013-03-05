define([
    'jquery',
    'underscore',
    'backbone',
    'template/model/item',
    'text!template/template/editor.html',
], function($, _, Backbone, TemplateItem, EditorTemplate) {
    var EditorView = Backbone.View.extend({
        template: _.template(EditorTemplate),
        events: {
            'keypress #template-title': 'titleKeypress',
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            if(this.model.get('blank')) {
                $('#template-title', this.$el).val('');
            }
            return this;
        },
        titleKeypress: function(e) {
            this.model.set('title', $('#template-title', this.$el).val());
        },
    });

    return EditorView;
});
