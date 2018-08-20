const express = require('express');
const fileUpload = require('express-fileupload');
const uploadController = require('../include/controllers').uploadController;
const uploadVal = require('../include/middlewares').upload;
const app = express();


app.use(fileUpload());

app.put('/upload/:type/:id', [uploadVal.verifyExt,uploadVal.verifyType], (req, res) => {
  let id = req.params.id;
  let file = req.file.file;
  let folder = req.file.folder;
  let ext = req.file.ext;
  uploadController.upload(id, file, folder,ext)
    .then(uploaded => res.status(uploaded.status).send(uploaded.data))
    .catch(err => res.status(err.status).send(err.data));
});




module.exports = app;