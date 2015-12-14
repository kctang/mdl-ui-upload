# mdl-ui-upload

UI control to perform image upload with preview capability. It uses Slingshot to upload from client to Google Cloud Storage (GCS) directly, bypassing Meteor server.

It was built as a plugin to mdl-ui.
  
# Usage

## Google Developers Console Configuration

* Setup an account & project
* Create service account (p12)
* Using openssl, generate pem file from p12
* Create a storage bucket
* Refer to [meteor-slingshot](https://github.com/CulturalMe/meteor-slingshot) to setup CORS on the bucket

## Get Google Cloud Storage (GCS) Keys
 
Download private key files from GCS console and store them in your project's `private` directory. 

    /private/xxx.pem

## Configure mdl-ui-upload

/main.js
Configure the upload plugin for both client and server.

    MdlUi.configure({
        upload: {
            bucket: 'xxx-bucket',
            googleAccessId: 'xxx@developer.gserviceaccount.com'
        }
    });
    
    // make sure MdlUi is initialized
    MdlUi.init();
  
/server/configure.js
Configure sensitive data on server side only.

    MdlUi.configure({
        upload: {
            privateKey: Assets.getText('xxx.pem')
        }
    });

## Use in Templates

To upload and preview single image, when the form is submitted, the `my-image` hidden input name will contain the URL for the uploaded image: 

    {{>mdlUiUpload name="my-image"}}

To upload multiple files:
 
    // mdlUiSection is part of the mdl-ui package
    {{#mdlUiSection name="my-multi-images"}}
     {{>mdlUiUpload name="my-multi-images.$" indexes=index}}
    {{/mdlUiSection}}
