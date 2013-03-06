define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {
    var TemplateItem = Backbone.Model.extend({
        defaults: {
            'title':    '',
            'modified': 'Right Now',
            'content':  '',
        },
        initialize: function() {
            this.clearDirty();
            this.on('change', this.setDirty, this);
            this.on('sync', this.clearDirty, this);
        },
        setDirty: function(dirty) {
            if(typeof dirty !== 'boolean') this.dirty = true;
            else this.dirty = dirty;
        },
        isDirty: function() {
            return this.dirty;
        },
        clearDirty: function() {
            this.setDirty(false);
        },
    });

    return TemplateItem;
});
