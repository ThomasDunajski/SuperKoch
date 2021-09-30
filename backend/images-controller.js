var fs = require('fs');
var upload = require('./upload');
var resizeService = require('./resize-service');
var express = require('express');
var router = express.Router();

router.post('/upload', (req, res) => {
  upload.upload(req, res, function (err) {
    if (req.fileValidationError) {
      console.log(req.fileValidationError);
      res.json({
        error_code: 1,
        err_desc: 'wrong file format only jpg is accepted.',
      });
      return;
    }
    if (err) {
      console.log(err);
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    const filename = req.file && req.file.filename ? req.file.filename : '';
    const path = './public/images/' + filename;
    const newFilename = filename.substr(0, filename.lastIndexOf('.')) + '.webp';

    resizeService.createThumbnail(path, `./public/images/thumb/${newFilename}`);
    resizeService.createLarge(path, `./public/images/large/${newFilename}`);
    resizeService.createWide(path, `./public/images/wide/${newFilename}`);

    res.json({ error_code: 0, err_desc: null, filename: filename });
  });
});

router.delete('/:imageId', async (req, res) => {
  console.log('TEst');
  var filename = req.params.imageId;
  if (filename) {
    const path = __dirname + '/public/images/' + filename;
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File ' + path + ' was deleted.');
      }
    });
    const newFilename = filename.substr(0, filename.lastIndexOf('.')) + '.webp';
    thumbPath = './public/images/thumb/' + newFilename;
    fs.unlink(thumbPath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File ' + thumbPath + ' was deleted.');
      }
    });
    largePath = './public/images/large/' + newFilename;
    fs.unlink(largePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File ' + largePath + ' was deleted.');
      }
    });
    res.json({ error_code: 0, err_desc: null, message: 'successfull deleted' });
  }
});

module.exports = router;
