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
        },
        updateNext: function(template) {
            if(template.get('title').length > 0 && template.get('content').length > 0) {
                this.enableNext();
            } else {
                this.disableNext();
            }
        },
    });
});
