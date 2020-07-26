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


app.get('/tags', async function (req, res) {
  var tags = await find("Tags", {});
  res.json(tags);
});

app.post('/tags/recomanded', async function (req, res) {
    var selectedTags = req.body.selectedTags;
    if (selectedTags === undefined){
        res.statusMessage = "selectedTags undefined";
        res.status(400).send();
    }
    else{
        var response = await find("Tags", {});
        selectedTags.forEach(selected => {
            response = response.filter( el => el.name.valueOf() !== selected.name.valueOf());      
        });
        response = response.sort(function(a, b){return a.category.number - b.category.number}); 
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
function find(collection, query, limit, skip, projection){
  return new Promise(async (resolve, reject) => {
   
    const connection = await getDb();
    const db = connection.db("SuperKoch");
     db
     .collection(collection)
     .find(query)
     .project(projection ? projection : {})
     .skip(skip ? skip : 0)
     .limit(limit ? linit : 0)
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
    var recipes = await find("recipes", {$and:[searchName,{$and:[selectedTags, season]}]}, limit, skip, projection);
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
app.get('/', function(req, res, next) {
  sendIndex(res);
});

app.use(function(req, res) {
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