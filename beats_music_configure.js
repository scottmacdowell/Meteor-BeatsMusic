Template.configureLoginServiceDialogForBeats_music.siteUrl = function () {
  return Meteor.absoluteUrl({replaceLocalhost: true});
};

Template.configureLoginServiceDialogForBeats_music.fields = function () {
  	return [
        {property: 'clientId', label: 'Client Id'},
        {property: 'secret', label: 'Client Secret'},
        {property: 'scope', label: "Scope (separated by a '+')"}
    ];
};