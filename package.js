Package.describe({
  name: 'kctang:mdl-ui-upload',
  version: '0.0.1',
  summary: 'UI control to perform image upload with preview capability',
  git: 'https://github.com/kctang/mdl-ui-upload',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.1');
  api.use([
    'ecmascript',
    'meteor-base',
    'kctang:mdl-ui@0.0.6',
    'edgee:slingshot@0.7.1'
  ]);
  api.use([
    'random'
  ], 'server');
  api.use([
    'templating',
    'stylus'
  ], 'client');

  api.imply([
    'edgee:slingshot'
  ]);

  api.addFiles([
    'src/mdl-ui-upload-plugin.js'
  ]);

  api.addFiles([
    'src/mdl-ui-upload.html',
    'src/mdl-ui-upload.js',
    'src/mdl-ui-upload.styl'
  ], 'client');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
});
