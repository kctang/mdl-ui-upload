Template.mdlUiUpload.events({
  'click button': function (event, view) {
    var iconName = $(event.currentTarget).first('i').text().trim();
    switch (iconName) {
      case 'delete':
        var name = MdlUi.Util2.resolveName(this);
        var form = MdlUi.Util2.resolveData(this, 'form');
        form.value(name, null, '');
        break;
      case 'file_upload':
        view.$('input[type=file]').click();
        break;
      default:
        throw new Meteor.Error('Unexpected button action');
    }
  },

  'change input[type=file]': function (event, view) {
    var self = this;
    var metaContext = {
      prefix: view.data.uploadPrefix || '',
      useUploadedFilename: view.data.uploadUseFilename === true,
      saveAs: view.data.uploadSaveAs,
      suffix: view.data.uploadSuffix
    };
    var uploader = new Slingshot.Upload('mdl-ui-upload', metaContext);
    uploader.send(event.currentTarget.files[0], function (error, downloadUrl) {
      if (error) {
        throw new Meteor.Error('Error uploading file [' + uploader.xhr.response + ']');
      } else {
        var name = MdlUi.Util2.resolveName(this.data);
        this.form.value(name, null, downloadUrl);
      }
    }.bind({
      // let upload callback access self and form
      data: self,
      form: MdlUi.Util2.resolveData(this, 'form')
    }));
  }

});

Template.mdlUiUpload.helpers({
  cell: MdlUi.Util.resolveCell,
  'class': function () {
    return MdlUi.Util2.resolveClass(this);
  },
  id: function () {
    return MdlUi.Util2.resolveId(this, 'mdl-ui-upload');
  },
  name: function () {
    return MdlUi.Util2.resolveName(this);
  },
  value: function () {
    return MdlUi.Util2.resolveValue(this);
  },

  classState: function () {
    var value = MdlUi.Util2.resolveValue(this);
    return value ? 'with-image' : 'no-image';
  },
  styleState: function () {
    var value = MdlUi.Util2.resolveValue(this);
    return value ? 'background-image: url("' + value + '")' : '';
  },
  iconState: function () {
    var value = MdlUi.Util2.resolveValue(this);
    return value ? 'delete' : 'file_upload';
  }
});
