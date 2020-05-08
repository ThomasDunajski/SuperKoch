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

app.post('/recepie', async function (req, res) {
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
    var connection = await getDb();
    var db = connection.db("SuperKoch");
    db.collection("Recepies").aggregate([
      {"$project": { number : 1 }},
      {"$sort": {"number":-1}},
      {"$limit": 1}
    ]).next().then((data) => {
      // Here you can do something with your data
      recipe.number = data.number +1;
      db.collection("Recepies").insert(recipe,(function(err, result) {
        console.log(result);
        res.json({message:"success"});
        connection.close();
      }));
    });
  }
});
function find(collection, query, limit, projection){
  return new Promise(async (resolve, reject) => {
   
    const connection = await getDb();
    const db = connection.db("SuperKoch");
     db
     .collection(collection)
     .find(query)
     .project(projection ? projection : {})
     .limit(limit)
     .toArray(function(err, data) {
        err 
           ? reject(err) 
           : resolve(data);
      });
  });
};

function findOne (query) {
  return new Promise(async (resolve, reject) => {

    const connection = await getDb();
    const db = connection.db("SuperKoch");
     db
     .collection('Recepies')
     .findOne(query, function(err, data) {
        err 
           ? reject(err) 
           : resolve(data);
        connection.close();
      });
  });
};

function getDb(){
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, con) {
      err 
      ? reject(err) 
      : resolve(con);
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
    var recipe = await findOne({number:recepieId});
    recipe.tags = resolveTags(recipe.tags);
    res.json(recipe);
});

app.post('/recepie/search', async function (req, res) {
  const selectedTags = req.body.selectedTags.length > 0 ? {tags: {$all: req.body.selectedTags}} : {};
  const season = req.body.season ?  {season: new Date().getMonth() + 1}: {};
  const searchName = req.body.searchName ?{$text: {$search:req.body.searchName}} : {};
  const projection = {name:1, imageUri:1, number:1, _id:0}
  const limit = 10;
  if (selectedTags === undefined){
      res.statusMessage = "selectedTags undefined";
      res.status(400).send();
  }
  else
  {
    var recipes = await find("Recepies", {$and:[searchName,{$and:[selectedTags, season]}]}, limit,  projection);
    res.json(recipes);
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

// GET home page.
var path = require('path');
app.get('/', function(req, res, next) {
  res.status(200).sendFile(path.join(__dirname, '/public/index.html')); 
});

app.use(function(req, res) {
  res.status(200).sendFile(path.join(__dirname, '/public/index.html')); 
 });

var fs = require('fs');
var url = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8')).url;
async function initTags(){
  //initalize tags
  tags = await find("Tags", {}, 100);
}

initTags();
   
//start server
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.listen(server_port, server_ip_address, function () {
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});

