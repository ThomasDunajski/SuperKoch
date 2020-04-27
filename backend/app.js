var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.json());

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

// read connection string with credentials from json
var fs = require('fs');
var url = JSON.parse(fs.readFileSync('config.json', 'utf8')).url;

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

