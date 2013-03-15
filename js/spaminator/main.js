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
                    'require': 'spaminator/view/population',
                    'hideUntilLoad': true,
                },
                'template': {
                    'require': 'spaminator/view/template',
                    'hideUntilLoad': true,
                },
                'sender': {
                    'require': 'spaminator/view/sender',
//                    'hideUntilLoad': true,
                },
                'review': {
                    'require': 'spaminator/view/review',
                    'hideUntilLoad': true,
                },
                'send': {
                    'require': 'spaminator/view/send',
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
