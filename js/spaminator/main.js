define([
    'spaminator/view/main'
], function(MainView) {
    var initialize = function(el) {
        var mainView = new MainView({
            el: el,
            views: {
                'welcome':    'spaminator/view/welcome.js',
                'population':
        });
        mainView.render();
    };

    return {
        initialize: initialize,
    };
});
