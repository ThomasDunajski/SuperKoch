var fs = require('fs');
var upload = require('./upload');
var resizeService = require('./resize-service');
var express = require('express')
var router = express.Router()

router.post('/upload', (req, res) => {
  upload.upload(req,res,function(err){
    if(req.fileValidationError) {
      console.log(req.fileValidationError);
      res.json({error_code:1,err_desc:"wrong file format only jpg is accepted."});
        return;
    }
    if(err){
      console.log(err);
      res.json({error_code:1,err_desc:err});
      return;
    }
    filename =  req.file && req.file.filename ? req.file.filename: "";
    path = "./public/images/" + filename;
    console.log(path)
    // only jpg and png are allowed to be uploaded
    if (path.includes(".jpg")){
      resizeService.createThumbnail(path, "./public/images/thumb/" + filename)
      resizeService.createLarge(path, "./public/images/large/" + filename)
      resizeService.createWide(path, "./public/images/wide/" + filename)
    }
    else{
      const pngFilename = filename.substr(0, filename.lastIndexOf(".png")) + ".jpg";
      resizeService.createThumbnail(path, "./public/images/thumb/" + pngFilename)
      resizeService.createLarge(path, "./public/images/large/" + pngFilename)
      resizeService.createWide(path, "./public/images/wide/" + pngFilename)
    }
    res.json({error_code:0,err_desc:null, filename: filename});
  })
});
  
router.delete('/:imageId', async (req, res) => {
  console.log('TEst')
  var filename = req.params.imageId;
  if (filename){
    const path = __dirname + "/public/images/" +filename;
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err)
      }
      else{
        console.log("File " + path + " was deleted.");
      }
    });
      thumbPath =   "./public/images/thumb/" + filename;
      fs.unlink(thumbPath, (err) => {
        if (err) {
          console.log(err)
        }
        else{
          console.log("File " + thumbPath + " was deleted.");
        }
      });
      largePath =  "./public/images/large/" + filename;
      fs.unlink(largePath, (err) => {
        if (err) {
          console.log(err)
        }
        else{
          console.log("File " + largePath + " was deleted.");
        }
      });
      res.json({error_code:0,err_desc:null, message:"successfull deleted"});
  }
});

module.exports = router;