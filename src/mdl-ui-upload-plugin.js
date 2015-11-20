'use strict';

var defaultOptions = {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  maxSize: 10 * 1024 * 1024, // 10 MB (null for unlimited)
  acl: 'public-read',
  privateKey: undefined,
  googleAccessId: undefined,
  bucket: undefined
};

class MdlUiUpload {
  constructor() {
    this.name = 'mdl-ui-upload';
    this.options = defaultOptions;
  }

  init() {
    _.extend(this.options, MdlUi.options.upload);

    this.initClientServer();
    Meteor.isServer && this.initServer();
  }

  initClientServer() {
    Slingshot.fileRestrictions(this.name, {
      allowedFileTypes: this.options.allowedFileTypes,
      maxSize: this.options.maxSize
    });
  }

  initServer() {
    Slingshot.GoogleCloud.directiveDefault.GoogleSecretKey = this.options.privateKey;

    Slingshot.createDirective(this.name, Slingshot.GoogleCloud, {
      bucket: this.options.bucket,
      acl: this.options.acl,
      GoogleAccessId: this.options.googleAccessId,
      authorize: function () {
        return true;
      },
      key: function (file, metaContext) {
        var filename = file.name;

        if (!metaContext.useUploadedFilename) {
          filename = metaContext.saveAs || 'new-' + Random.id();
          if (metaContext.suffix) {
            filename += metaContext.suffix;
          }
        }

        return metaContext.prefix + filename;
      }
    });
  }
}

MdlUi.addPlugin(new MdlUiUpload());
