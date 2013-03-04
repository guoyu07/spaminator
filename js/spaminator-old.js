spaminator = { };

(function($) {
    spaminator.initialize = function() {
        $('#welcomeState').hide();
        $('#templateState').hide();
        
        spaminator.showWelcomeState();
    }

    spaminator.showWelcomeState = function() {
        $('#get-started').show();

        $('#welcomeState').show('slow');

        $('#get-started').click(function(e) {
            $('#get-started').hide('fast');

            spaminator.showTemplateState();
        });
    }

    spaminator.showTemplateState = function() {
        $('#templateState').show('slow');
    }

})(jQuery);
