define([
    'libess',
], function(ESS) {
    var TemplateItem = ESS.DirtyModel.extend({
        defaults: {
            'title':    '',
            'modified': 'Right Now',
            'content':  '',
        },
    });

    return TemplateItem;
});
