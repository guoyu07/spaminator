define([
    'population/view/main'
], function(MainView) {
    var initialize = function() {
        $('#population-container').css({
            'margin-bottom': $('#footer').outerHeight(true),
        });

        var mainView = new MainView({el: $('#population-container')});
        mainView.render();
    };

    return {
        initialize: initialize,
    };
});
