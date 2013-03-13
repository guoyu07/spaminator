define([
    'underscore',
    'backbone',
    'text!spaminator/template/layout.html',
    'text!spaminator/template/menu.html',
], function(_, Backbone, LayoutTemplate, MenuTemplate) {
    return Backbone.View.extend({
        template: _.template(LayoutTemplate),
        menuTemplate: _.template(MenuTemplate),
        initialize: function(options) {
            this.viewClasses = {};
            this.views = {};
            var first = null;
            _.each(options.views, function(value, key, list) {
                if(first == null) first = key;
                this.viewClasses[key] = value;
                this.views[key] = null;
            }, this);

            if(options.initialView) {
                this.switchTo(options.initialView);
            } else {
                this.switchTo(first);
            }
        },
        render: function() {
            this.$el.html(this.template());
            this.$menu = $('#spaminator-menu', this.$el);
            this.$content = $('#spaminator-content', this.$el);

            var cv = this.currentView;

            this.$menu.html(this.menuTemplate());
            $('[data-view]', this.$menu).removeClass('active');
            $('[data-view="'+cv+'"]', this.$menu).addClass('active');
        },
        switchTo: function(viewName) {
            var me = this;

            // This whole section is why it's efficient, or maybe why it's not efficient.
            // It loads the view you want the first time you want it.
            if(!this.views[viewName]) {
                require([require, this.viewClasses[viewName]],
                    function(require, TheView) {
                        me.views[viewName] = new TheView();
                        me.switchTo.call(me, viewName);
                    },
                    function(error) {
                        alert('Could not load view ' + viewName + ': ' + error);
                    }
                );
                return;
            }

            this.currentView = viewName;
            this.views[viewName].setElement(this.$content);
            this.views[viewName].render();
            this.trigger('change');
        },
    });
});
