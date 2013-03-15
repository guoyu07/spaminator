define([
    'underscore',
    'backbone',
    'spaminator/view/abstract-subview',
    'text!spaminator/template/sender.html',
], function(_, Backbone, AbstractSubview, SenderTemplate) {
    return AbstractSubview.extend({
        template: _.template(SenderTemplate),
        events: {
            'keyup #senderName':  'updateNext',
            'keyup #senderEmail': 'updateNext',
        },
        render: function() {
            this.$el.html(this.template(this.persona.toJSON()));

            this.$name  = $('input#senderName',  this.$el);
            this.$email = $('input#senderEmail', this.$el);

            this.$nameHelp  = $('#senderNameHelp',  this.$el);
            this.$emailHelp = $('#senderEmailHelp', this.$el);

            this.initNext();
        },
        checkName: function() {
            var val = this.$name.val();

            // TODO: should this ask the server for validation?
            var exists     = this.$name.length != 0;
            var hasContent = !!val;
            var valid      = !exists || hasContent;

            if(valid) {
                this.$name.parents('.control-group')
                    .removeClass('error')
                    .addClass('success');
                this.$nameHelp.empty();
                if(exists) this.persona.set('name', val);
            } else {
                this.$name.parents('.control-group')
                    .removeClass('success')
                    .addClass('error');
                this.$nameHelp.text('Please specify a name.');
            }

            return valid;
        },
        checkEmail: function() {
            var val = this.$email.val();
            var emailRegex = /\S*@\S*/;

            // If no elements matched in the $email selector, assume correct
            // Otherwise, basic check for an @ sign and no spaces.
            // TODO: should this ask the server for validation?
            var exists = this.$email.length != 0;
            var hasContents = !!val;
            var matchesRegex = emailRegex.test(val);

            var valid = !exists || (hasContents && matchesRegex);

            if(valid) {
                this.$email.parents('.control-group')
                    .removeClass('error')
                    .addClass('success');
                this.$emailHelp.empty();
                if(exists) this.persona.set('email', val);
            } else {
                this.$email.parents('.control-group')
                    .removeClass('success')
                    .addClass('error');

                if(!hasContents) {
                    this.$emailHelp.text('Please specify an email address.');
                } else if(!matchesRegex) {
                    this.$emailHelp.text('Please specify a valid email address.');
                }
            }

            return valid;
        },
        updateNext: function() {
            var nameValid  = this.checkName();
            var emailValid = this.checkEmail();

            if(this.checkName() && this.checkEmail()) {
                this.enableNext();
            } else {
                this.disableNext('Missing Name or Email', 'Please enter a name and a valid email address.');
            }
        },
    });
});
