var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var upload = require('./upload');

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
    // trim all strings
    for (let key in recipe) {
      if (typeof recipe[key] === 'string' || recipe[key] instanceof String){
        recipe[key] = recipe[key].trim();
      }
    }
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("SuperKoch");
      dbo.collection("Recepies").aggregate([
        {"$project": { number : 1 }},
        {"$sort": {"number":-1}},
        {"$limit": 1}
      ]).next().then((data) => {
        // Here you can do something with your data
        recipe.number = data.number +1;
        dbo.collection("Recepies").insert(recipe,(function(err, result) {
          console.log(result);
          res.json({message:"success"});
          db.close();
        }));
      });
    });
  }
});
function find(db, collection, query, limit){
  return new Promise((resolve, reject) => {
   
     db
     .collection(collection)
     .find(query)
     .limit(limit? limit : 10)
     .toArray(function(err, data) {
        err 
           ? reject(err) 
           : resolve(data);
      });
  });
};

function findOne (db, query) {
  return new Promise((resolve, reject) => {

     db
     .collection('Recepies')
     .findOne(query, function(err, data) {
        err 
           ? reject(err) 
           : resolve(data);
      });
  });
};

function resolveTags(tagIds){
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
  return recepieTags;
}

app.get('/recepie/:recepieId', async function (req, res) {
    var recepieId = parseInt(req.params.recepieId);
    MongoClient.connect(url, async function(err, con) {
        if (err) throw err;
        const db = con.db("SuperKoch");
        var recipe = await findOne(db, {number:recepieId});
        recipe.tags = resolveTags(recipe.tags);
        res.json(recipe);
        con.close();
    });
});

app.post('/recepie/search', function (req, res) {
  const selectedTags = req.body.selectedTags;
  const season = req.body.season ?  {season: new Date().getMonth() + 1}: {};
  if (selectedTags === undefined){
      res.statusMessage = "selectedTags undefined";
      res.status(400).send();
  }
  else
  {
    MongoClient.connect(url, async function(err, con) {
      if (err) throw err;
      const db = con.db("SuperKoch");
      var recipes = await find(db, "Recepies", {$and:[{tags: {$all: selectedTags}}, season]});
      res.json(recipes);
      con.close();
    });
  }
});

app.post('/images/upload', function(req, res) {
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
      res.json({error_code:0,err_desc:null, filename: filename});
  })
});

// read connection string with credentials from json
//var fs = require('fs');
//var url = JSON.parse(fs.readFileSync('config.json', 'utf8')).url;

var url = "mongodb+srv://SUperkovh:2MlYEch6qBslJ95s@superkoch-unfs3.mongodb.net/test?retryWrites=true&w=majority";
//initalize tags
MongoClient.connect(url, async function(err, con) {
    if (err) throw err;
    const db = con.db("SuperKoch");
    tags = await find(db, "Tags", {}, 100);
    con.close();
    
    //start server
    var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
    var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    app.listen(server_port, server_ip_address, function () {
        console.log("Listening on " + server_ip_address + ", server_port " + server_port)
    });
  });

