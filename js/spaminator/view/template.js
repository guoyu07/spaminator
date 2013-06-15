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
            AbstractSubview.prototype.initialize.apply(this, arguments);

            this.subview = new TemplateView();

            this.listenTo(this.subview, 'selected', this.updateNext);
            this.listenTo(this.subview, 'changed', this.updateNext);
        },
        updateNext: function(template) {
            if(!template) template = this.subview.getSelectedTemplate();
            if(!template) {
                this.disableNext('No Template Selected', 'Please select a template before proceeding.');
                return;
            }
            if(template.get('title').length > 0 && template.get('content').length > 0) {
                this.spamination.set('templateDataSource', template.url());
                this.enableNext();
            } else {
                this.disableNext('Incomplete Template', 'Please enter a complete template before proceeding.');
            }
        },
    });
});
