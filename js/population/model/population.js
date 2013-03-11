define([
    'libess',
    'population/collection/member',
    'population/model/member',
    'population/config',
], function(ESS, MemberCollection, Member, Config) {
    return ESS.DirtyModel.extend({
        urlRoot: Config.memberUri,
        initialize: function() {
            this.collection = new MemberCollection({url: this.url});
            this.listenTo(this, 'sync', this.fixurl);
        },
        parse: function(response) {
            var me = this;
            this.attributes.members = undefined;
            _.each(response.members, function(member) {
                me.collection.add(member);
            });
            return({id: response.id, members: ''});
        },
        fixurl: function() {
            this.collection.url = this.url();
        }
    });
});
