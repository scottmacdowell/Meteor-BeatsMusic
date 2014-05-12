Beats_Music = {};

var querystring = Npm.require('querystring');

Oauth.registerService('beats_music', 2, function(query) {

    var accessToken = getAccessToken(query);
    var userID = getUserID(accessToken);
    var userInfo = getUserInfo(accessToken, userID);

    return {
        serviceData: {
            id: accessToken.user.id,
            accessToken: accessToken.access_token,
            username: accessToken.user.username
        },
        options: {
            profile: {
                name: accessToken.user.full_name
            }
        }
    };
});

var getAccessToken = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'beats_music'});
    if (!config)
        throw new ServiceConfiguration.ConfigError("Service not configured");

    var result = HTTP.post(
        "https://partner.api.beatsmusic.com/oauth2/token", {params: {
            code: query.code,
            client_id: config.clientId,
            redirect_uri: Meteor.absoluteUrl("_oauth/beats_music?close=close", {replaceLocalhost: true}),
            response_type: 'token',
            grant_type: 'authorization_code'
        }});

    if (result.error) // if the http response was an error
        throw result.error;
    if (typeof result.content === "string")
        result.content = JSON.parse(result.content);
    if (result.content.error) // if the http response was a json object with an error attribute
        throw result.content;
    console.log(result.content);
    return result.content;
};

var getUserID = function(accessToken) {
    var result = HTTP.post(
    "https://partner.api.beatsmusic.com/v1/api/me", {params: {
        access_token: accessToken
    }});

    if (result.error) // if the http response was an error
        throw result.error;
    if (typeof result.content === "string")
        result.content = JSON.parse(result.content);
    if (result.content.error) // if the http response was a json object with an error attribute
        throw result.content;
    return result.content;
}

//Call to get User Information
var getUserInfo = function (accessToken, userID) {
  var result = Meteor.http.get(
  "https://partner.api.beatsmusic.com/v1/api/users/"+userID, {params: {
      access_token: accessToken
  }});

  if (result.error)
    throw result.error;
  return result.data;
};

Beats_Music.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};

