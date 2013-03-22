define([
    'underscore',
    'backbone',
    'spaminator/config',
    'spaminator/model/persona',
    'text!spaminator/template/layout.html',
    'text!spaminator/template/menu.html',
    'text!spaminator/template/loading.html',
], function(_, Backbone, Config, Persona, LayoutTemplate, MenuTemplate, LoadingTemplate) {
    return Backbone.View.extend({
        template: _.template(LayoutTemplate),
        menuTemplate: _.template(MenuTemplate),
        loadingTemplate: _.template(LoadingTemplate),
        persona: null,
        events: {
            'click .spaminator-link': 'switchClicked',
        },
        initialize: function(options) {
            // Initialize Persona
            persona = this.persona = new Persona();
            this.persona.url = Config.personaSource;
            this.persona.fetch();

            // Initialize Views
            this.views = {};
            var first = null;
            _.each(options.views, function(value, key, list) {
                if(first == null) first = key;
                this.views[key] = _.extend(_.clone(Config.viewDefaults), value);
            }, this);

            this.render();

            // Switch to Initial View
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
                // Get the menu element
                var el = $('.spaminator-link[data-view="'+key+'"]', this.$menu);

                // Set active class
                if(key == this.currentView) {
                    el.parent('li').addClass('active');
                } else {
                    el.parent('li').removeClass('active');
                }

                // Hide unloaded views if that's appropriate
                if(value.hideUntilLoad) {
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

            // If the view name is the special code '.next', just go to the next view.
            if(viewName == '.next') {
                this.switchBy(1);
                return;
            }

            // If the view name is the special code '.prev', just go to the prev view.
            if(viewName == '.prev') {
                this.switchBy(-1);
                return;
            }

            // This whole section is why it's efficient, or maybe why it's not efficient.
            // It loads the view you want the first time you want it.
            if(!this.views[viewName].instance) {
                this.$content.html(this.loadingTemplate({title: viewName}));
                require([require, this.views[viewName].require],
                    function(require, TheView) {
                        me.views[viewName].instance = new TheView();
                        me.views[viewName].instance.setPersona(me.persona);
                        me.switchTo.call(me, viewName);
                    },
                    function(error) {
                        console.log(error);
                        console.log('Could not load view ' + viewName + ': ' + error);
                    }
                );
                return;
            }

            this.currentView = viewName;
            this.views[viewName].instance.setElement(this.$content);
            this.views[viewName].instance.render();

            this.updateMenu();

            this.trigger('change');
        },
        switchBy: function(offset) {
            var views = Object.keys(this.views);
            this.switchTo(views[views.indexOf(this.currentView) + offset]);
        },
        switchClicked: function(e) {
            e.preventDefault();
            target = $(e.target);

            // If disabled, return
            if(target.hasClass('disabled')) return;

            // If has class spaminator-next, just go to whatever the next view is.
            if(target.hasClass('spaminator-next')) {
                this.switchBy(1);
                return;
            }

            // If has class spaminator-prev, just go to whatever the previous view is.
            if(target.hasClass('spaminator-prev')) {
                this.switchBy(-1);
                return;
            }

            // If data-view is not set, return
            var view = $(e.target).attr('data-view');
            if(!view) {
                console.log('Got click on class .spaminator-link but no data-view was set.');
                return;
            }

            this.switchTo(view);
        },
    });
});
