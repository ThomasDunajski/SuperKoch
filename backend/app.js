var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var path = require('path');

var upload = require('./upload');
var thumbnail = require('./thumbnail');

var tagsController = require('./tags-controller');
var recipeController = require('./recipe-controller');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// routes
app.get('/tags', tagsController.getTags);

app.post('/tags', tagsController.addTag);

app.post('/recepie', recipeController.addRecipe);

app.get('/recepie/:recepieId', recipeController.getRecipe);

app.post('/recepie/search', recipeController.searchRecipe);

app.post('/images/upload', (req, res) => {
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

app.delete('/images/:imageId', (req, res) => {
  var filename = req.params.imageId;
  if (filename){
    var path = __dirname + "/public/images/" +filename;
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err)
      }
      else{
        console.log("File " + path + " was deleted.");
      }
    });
      path =  path.substr(0, path.lastIndexOf(".jpg")) + "_thumb.jpg";
      console.log(path)
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err)
        }
        else{
          console.log("File " + path + " was deleted.");
        }
      });
      path =  path.substr(0, path.lastIndexOf(".jpg")) + "_large.jpg";
      console.log(path)
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err)
        }
        else{
          console.log("File " + path + " was deleted.");
        }
      });
      res.json({error_code:0,err_desc:null, message:"successfull deleted"});
  }
});

app.get('/collection', (req, res) => {
  res.json([{name:"collection1", number:1, text: "Lorem Ipsum", imageUrl:"api/images/1591724229216.XZgui_thumb.jpg"},{name:"collection2", number:2, text: "Lorem Ipsum", imageUrl:"api/images/1591724229216.XZgui_thumb.jpg"},{name:"collection3", number:3, text: "Lorem Ipsum", imageUrl:"api/images/1591724229216.XZgui_thumb.jpg"},{name:"collection4", number:4, text: "Lorem Ipsum", imageUrl:"api/images/1591724229216.XZgui_thumb.jpg"}]);
});
app.get('/collection/:collectionId', (req, res) => {
  res.json({name:"collection1",imageUrl:"http://sf1.mariefranceasia.com/wp-content/uploads/sites/7/2017/06/dimsum-1.jpg", text:"lorem ipsum und so weier hasjka iayvu iuoab", number:parseInt(req.params.recepieId), recipes:[12, 45, 54, 100 ]});
});

// GET home page.
var path = require('path');
app.get('/', (req, res) => {
  sendIndex(res);
});

app.use((req, res) => {
  sendIndex(res);
 });

const indexPath = path.join(__dirname, '/public/index.html');
function sendIndex(res){
  res.status(200).sendFile(indexPath); 
} 

var fs = require('fs');
var url = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8')).url;
   
//start server
var server_port = 8080;
app.listen(server_port, function () {
  console.log("Listening on port " , server_port)
});