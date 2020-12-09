var fs = require('fs');
var upload = require('./upload');
var thumbnail = require('./thumbnail');
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
      thumbnail.createThumbnail(path, path.substr(0, path.lastIndexOf(".jpg")) + "_thumb.jpg")
      thumbnail.createLarge(path, path.substr(0, path.lastIndexOf(".jpg")) + "_large.jpg")
    }
    else{
      thumbnail.createThumbnail(path, path.substr(0, path.lastIndexOf(".png")) + "_thumb.jpg")
      thumbnail.createLarge(path, path.substr(0, path.lastIndexOf(".png")) + "_large.jpg")
    }
    res.json({error_code:0,err_desc:null, filename: filename});
  })
});
  
router.delete('/images/:imageId', async (req, res) => {
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
      thumbPath =  path.substr(0, path.lastIndexOf(".jpg")) + "_thumb.jpg";
      fs.unlink(thumbPath, (err) => {
        if (err) {
          console.log(err)
        }
        else{
          console.log("File " + thumbPath + " was deleted.");
        }
      });
      largePath =  path.substr(0, path.lastIndexOf(".jpg")) + "_large.jpg";
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