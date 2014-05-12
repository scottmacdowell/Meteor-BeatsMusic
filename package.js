Package.on_use(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('templating', 'client');
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Beats_Music');

  api.add_files(
    ['beats_music_configure.html', 'beats_music_configure.js'],
    'client');

  api.add_files('beats_music_server.js', 'server');
  api.add_files('beats_music_client.js', 'client');
});