define([
    'libess',
    'spaminator/config',
    'spaminator/model/reportItem',
], function(ESS, Config ,ReportItem) {
    return ESS.DirtyModel.extend({
        urlRoot: Config.spaminationSource,
        defaults: {
            'recipientDataSource': '',
            'templateDataSource':  '',
            'senderName':          '',
            'senderEmail':         '',
            'hasTested':           false,
            'hasSent':             false,
            'sendReport':          [],
        },
        parse: function(response, options) {
            _.each(response.sendReport, function(item) {
                this.sendReport.push(new ReportItem(item));
            }, this);
            delete response.sendReport;
            return response;
        },
    });
});
