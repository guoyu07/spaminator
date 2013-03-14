define([
    'underscore',
    'backbone',
    'spaminator/config',
    'text!spaminator/template/layout.html',
    'text!spaminator/template/menu.html',
    'text!spaminator/template/loading.html',
], function(_, Backbone, Config, LayoutTemplate, MenuTemplate, LoadingTemplate) {
    return Backbone.View.extend({
        template: _.template(LayoutTemplate),
        menuTemplate: _.template(MenuTemplate),
        loadingTemplate: _.template(LoadingTemplate),
        events: {
            'click .spaminator-link': 'switchClicked',
        },
        initialize: function(options) {
            this.views = {};
            var first = null;
            _.each(options.views, function(value, key, list) {
                if(first == null) first = key;
                this.views[key] = _.extend(_.clone(Config.viewDefaults), value);
                console.log(this.views);
            }, this);

            this.render();

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

            // Render Current View, if any
            if(cv) {
                $('[data-view="'+cv+'"]', this.$menu).addClass('active');
            }

            this.updateMenu();
        },
        updateMenu: function() {
            _.each(this.views, function(value, key, list) {
                if(value.hideUntilLoad) {
                    var el = $('.spaminator-link[data-view="'+key+'"]', this.$el);
                    if(!this.views[key].instance) {
                        el.hide();
                    } else {
                        el.show();
                    }
                }
            }, this);
        },
        switchTo: function(viewName) {
            var me = this;

            // This whole section is why it's efficient, or maybe why it's not efficient.
            // It loads the view you want the first time you want it.
            if(!this.views[viewName].instance) {
                this.$content.html(this.loadingTemplate({title: viewName}));
                console.log(this.views[viewName]);
                require([require, this.views[viewName].require],
                    function(require, TheView) {
                        me.views[viewName].instance = new TheView();
                        me.switchTo.call(me, viewName);
                    },
                    function(error) {
                        console.log('Could not load view ' + viewName + ': ' + error);
                    }
                );
                return;
            }

            this.updateMenu();

            this.currentView = viewName;
            this.views[viewName].instance.setElement(this.$content);
            this.views[viewName].instance.render();
            this.trigger('change');
        },
        switchClicked: function(e) {
            e.preventDefault();
            var view = $(e.target).attr('data-view');
            if(!view) return;

            this.switchTo(view);
        },
    });
});
