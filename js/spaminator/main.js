define([
    'spaminator/view/main'
], function(MainView) {
    var initialize = function(el) {
        var mainView = new MainView({
            el: el,
            views: {
                'welcome':    'spaminator/view/welcome',
                'population': 'population/view/main',
                'template':   'template/view/main',
            },
            initialView: 'welcome',
        });
        mainView.render();
    };

    return {
        initialize: initialize,
    };
});
