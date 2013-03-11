define([
    'template/view/main',
], function(MainView) {
    var initialize = function() {
        $('#template-container').css({
            'margin-bottom': $('footer').outerHeight(true),
        });

        var mainView = new MainView({el: $('#template-container')});
        mainView.render();
    };

    return {
        initialize: initialize,
    };
});
