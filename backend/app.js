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
      thumbnail.create(path, path.substr(0, path.lastIndexOf(".jpg")+1) + "_thumb.jpg")
    }
    else{
      thumbnail.create(path, path.substr(0, path.lastIndexOf(".png")+1) + "_thumb.jpg")
    }
    res.json({error_code:0,err_desc:null, filename: filename});
  })
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