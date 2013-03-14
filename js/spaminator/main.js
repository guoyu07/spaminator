define([
    'spaminator/view/main'
], function(MainView) {
    var initialize = function(el) {
        var mainView = new MainView({
            el: el,
            views: {
                'welcome': {
                    'require': 'spaminator/view/welcome',
                },
                'population': {
                    'require': 'population/view/main',
                    'hideUntilLoad': true,
                },
                'template': {
                    'require': 'template/view/main',
                    'hideUntilLoad': true,
                },
                'confirmation': {
                    'require': 'spaminator/view/confirmation',
                    'hideUntilLoad': true,
                },
                'report': {
                    'require': 'spaminator/view/report',
                    'hideUntilLoad': true,
                },
                'history': {
                    'require': 'spaminator/view/history',
                },
            },
            initialView: 'welcome',
        });
        mainView.render();
    };

    return {
        initialize: initialize,
    };
});
