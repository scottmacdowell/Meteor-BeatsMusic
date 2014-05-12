Beats_Music = {};



Beats_Music.requestCredential = function (options, callback) {

    if (!callback && typeof options === 'function') {
        callback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'beats_music'});
    if (!config) {
        callback && callback(new ServiceConfiguration.ConfigError("Service not configured"));
        return;
    }

    var state = Meteor.uuid();
    var loginUrl =
        'https://partner.api.beatsmusic.com/v1/oauth2/authorize' +
            '?client_id=' + config.clientId +
            '&redirect_uri=' + Meteor.absoluteUrl('_oauth/beats_music?close=close', {replaceLocalhost: true}) +
            '&response_type=code' +
            '&scope=' + config.scope +
            '&state=' + state;

    Oauth.initiateLogin(state, loginUrl, callback);
};