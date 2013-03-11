define([
    'jquery',
    'backbone',
    'population/model/member',
    'population/config',
], function($, Backbone, Member, Config) {
    var MemberCollection = Backbone.Collection.extend({
        model: Member,
    });

    return MemberCollection;
});
