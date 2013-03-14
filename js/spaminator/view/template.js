define([
    'underscore',
    'backbone',
    'spaminator/view/abstract-subview',
    'template/view/main',
    'text!spaminator/template/template.html',
], function(_, Backbone, AbstractSubview, TemplateView, TemplateTemplate) {
    return AbstractSubview.extend({
        template: _.template(TemplateTemplate),
        initialize: function() {
            this.subview = new TemplateView();

            this.listenTo(this.subview, 'selected', this.updateNext);
            this.listenTo(this.subview, 'changed', this.updateNext);
        },
        updateNext: function(template) {
            if(!template) template = this.subview.getSelectedTemplate();
            if(!template) {
                this.disableNext();
                return;
            }
            if(template.get('title').length > 0 && template.get('content').length > 0) {
                this.enableNext();
            } else {
                this.disableNext();
            }
        },
    });
});
