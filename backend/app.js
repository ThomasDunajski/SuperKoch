var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var upload = require('./upload');
var thumbnail = require('./thumbnail');
var path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 


app.get('/tags', async (req, res) => {
  var tags = await find({collection:"Tags", query:{}, sort:{name:1}});
  res.json(tags);
});

app.post('/tags', async (req, res) => {
  var tag = req.body.tag;
  var connection = await getDb();
  var db = connection.db("SuperKoch");
  db.collection("Tags").insertOne(tag, function(){
    connection.close();
  });
  res.json(tag);
});

app.post('/recepie', async (req, res) =>{
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
    if (recipe.number)
    {
      updateRecipe(recipe, req, res);
    }
    else{
      addRecipe(recipe, req, res);
    }
  }
});

async function updateRecipe(recipe, req, res){
  delete recipe._id;
  var connection = await getDb();
  var db = connection.db("SuperKoch");
  db.collection("recipes").update({number:recipe.number}, recipe, function(err, result){
    if(err){
      console.log(err);
    }
    res.json({message:"success", url:"/recipe/" + recipe.number});
    connection.close();
  });
}

async function addRecipe(recipe, req, res){
  var connection = await getDb();
  var db = connection.db("SuperKoch");
  db.collection("recipes").aggregate([
    {"$project": { number : 1 }},
    {"$sort": {"number":-1}},
    {"$limit": 1}
  ]).next().then((data) => {
    recipe.number = data ? data.number +1 : 1;
    db.collection("recipes").insert(recipe,(function(err, result) {
      if(err){
        console.log(err);
      }
      console.log(result);
      res.json({message:"success", url:"/recipe/" + recipe.number});
      connection.close();
    }));
  });
}
function find(options){
  // collection, query, limit, skip, projection
  return new Promise(async (resolve, reject) => {
    if (!options.limit) options.limit = 0;
    if (!options.skip) options.skip = 0;
    if (!options.projection) options.projection = {};
    if (!options.sort) options.sort = {};
    const connection = await getDb();
    const db = connection.db("SuperKoch");
     db
     .collection(options.collection)
     .find(options.query)
     .project(options.projection )
     .skip(options.skip)
     .limit(options.limit)
     .sort(options.sort)
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
     .collection('recipes')
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

async function resolveTags(tagIds){
  if (!tagIds) return [];
  var idObjects = [];
  tagIds.forEach(tagId =>{
    idObjects.push(new ObjectId(tagId));
  }); 
  return find({collection:"Tags", query:{_id: {$in:idObjects}}});
}

app.get('/recepie/:recepieId', async  (req, res) => {
    var recepieId = parseInt(req.params.recepieId);
    var recipe = await findOne({number:recepieId});
    recipe.tags = await resolveTags(recipe.tags);
    res.json(recipe);
});

app.post('/recepie/search', async (req, res) => {
  const selectedTags = req.body.selectedTags.length > 0 ? {tags: {$all: req.body.selectedTags}} : {};
  const season = req.body.season ?  {season: new Date().getMonth() + 1}: {};
  const skip = req.body.skip ?  parseInt(req.body.skip): 0;
  const searchName = req.body.searchName ?{$text: {$search:req.body.searchName}} : {};
  const projection = {name:1, imageUri:1, number:1, _id:0}
  const limit = req.body.limit ?  parseInt(req.body.limit): 10;
  if (selectedTags === undefined){
      res.statusMessage = "selectedTags undefined";
      res.status(400).send();
  }
  else
  {
    var recipes = await find({
      collection:"recipes", 
      query:{$and:[searchName,{$and:[selectedTags, season]}]}, 
      limit:limit, 
      skip:skip, 
      projection:projection
    });
    res.json(recipes);
  }
});

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