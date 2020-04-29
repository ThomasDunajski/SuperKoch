var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var multer = require('multer');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

var MongoClient = require('mongodb').MongoClient;

var tags;

app.get('/tags', function (req, res) {
    res.json(tags);
});

app.post('/tags/recomanded', function (req, res) {
    var selectedTags = req.body.selectedTags;
    if (selectedTags === undefined){
        res.statusMessage = "selectedTags undefined";
        res.status(400).send();
    }
    else{
        response = tags;
        selectedTags.forEach(selected => {
            response = response.filter( el => el.name.valueOf() !== selected.name.valueOf() );      
        });
        res.json(response);
    }
});

app.post('/recepie', function (req, res) {
  var recipe = req.body.recipe;
  if (recipe === undefined){
      res.statusMessage = "recipe undefined";
      res.status(400).send();
  }
  else{
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("SuperKoch");
      dbo.collection("Recepies").insert(recipe,(function(err, result) {
        console.log(result);
        res.json({message:"success"});
        db.close();
      }));
    });
  }
});

app.get('/recepie/:recepieId', function (req, res) {
    var recepieId = parseInt(req.params.recepieId);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("SuperKoch");
        dbo.collection("Recepies").findOne({number:recepieId},(function(err, result) {
          if (err) throw err;
          if(result === null || result === undefined){
            res.json(result);
            db.close();
            return
          }
          const tagIds = result.tags;
          var recepieTags =[];
          // resolve tags
          var tagIdString
          tagIds.forEach(tagId =>{
            tagIdString = JSON.stringify(tagId);
            tags.forEach(tag =>{
              if (JSON.stringify(tag._id) === tagIdString){
                recepieTags.push(tag);
              }
            });
          });
          result.tags = recepieTags;
          res.json(result);
          db.close();
        }));
      });
});

app.post('/recepie/TagSearch', function (req, res) {
  var selectedTags = req.body.selectedTags;
  if (selectedTags === undefined){
      res.statusMessage = "selectedTags undefined";
      res.status(400).send();
  }
  else
  {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("SuperKoch");
      dbo.collection("Recepies").find({tags: {$all: selectedTags}}, {name: 1}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.json(result);
        db.close();
      });
    });
  }
});

app.post('/upload', function(req, res) {
  console.log('upload called')
  upload(req,res,function(err){
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
       res.json({error_code:0,err_desc:null, filename: req.file.filename});
  })
});

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, 'public\\images')
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, datetimestamp + '.' + makeid(5) + '.jpg');
  }
});
var upload = multer({ //multer settings
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/jpeg') {
     req.fileValidationError = 'goes wrong on the mimetype';
     return cb(null, false, new Error('goes wrong on the mimetype'));
    }
    cb(null, true);
   }, 
   limits: { fileSize: 10000000 }
}).single('file');
// read connection string with credentials from json
//var fs = require('fs');
//var url = JSON.parse(fs.readFileSync('config.json', 'utf8')).url;

var url = "mongodb+srv://SUperkovh:2MlYEch6qBslJ95s@superkoch-unfs3.mongodb.net/test?retryWrites=true&w=majority";
//initalize tags
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("SuperKoch");
    dbo.collection("Tags").find({}).toArray(function(err, result) {
      if (err) {
        console.log("failed initializing tags: " + err.message)
      }else{
        console.log(result);
        tags = result;
        console.log("tags initialized")
      }
      db.close();
      //start server
      var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
      var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
      app.listen(server_port, server_ip_address, function () {
          console.log("Listening on " + server_ip_address + ", server_port " + server_port)
      });
    });
  });

