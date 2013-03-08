define([
    'backbone',
], function(Backbone) {
    var DirtyModel = Backbone.Model.extend({
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
    return {
        DirtyModel: DirtyModel,
    };
});
