var dbService = require("./db-service");
var recipeService = require("./recipe-service");
var express = require('express')
var router = express.Router()

router.get('/:collectionId', async  (req, res) => {
  var collectionId = parseInt(req.params.collectionId);
  let options = {collection: "collections", query:{number:collectionId}}
  let collections = await dbService.find(options);
  let collection = collections[0];
  let newSections = [];
  for (const section of collection.sections) {
    const recipes = await recipeService.getRecipes(section.recipes);
    section.recipes = recipes;
    newSections.push(section);
  }
  collection.sections = newSections;
  res.json(collection);
});

router.get('/', async  (req, res) => {
  console.log('kommt an')
  let options = {collection: "collections", query:{}, projection:{name:1,imageUrl:1, number:1, text:1}}
  collections = await dbService.find(options)
  res.json(collections);
});

router.post('/', async (req, res) =>{
  var collection = req.body.collection;
  if (collection === undefined){
      res.statusMessage = "recipe undefined";
      res.status(400).send();
  }
  else{
    // trim all strings
    for (let key in collection) {
      if (typeof collection[key] === 'string' || collection[key] instanceof String){
        collection[key] = collection[key].trim();
      }
    }
    if (collection.number)
    {
      updateCollection(collection, req, res);
    }
    else{
      addCollection(collection, req, res);
    }
  }
});

async function updateCollection(collection, req, res){
  delete collection._id;
  var connection = await dbService.getDB();
  var db = connection.db("rezeptekiste");
  db.collection("collections").update({number:collection.number}, collection, function(err, result){
    if(err){
      console.log(err);
    }
    res.json({message:"success", url:"/collection/" + collection.number});
    connection.close();
  });
}

async function addCollection(collection, req, res){
console.log(collection)
  var connection = await dbService.getDB();
  var db = connection.db("rezeptekiste");
  db.collection("collections").aggregate([
    {"$project": { number : 1 }},
    {"$sort": {"number":-1}},
    {"$limit": 1}
  ]).next().then((data) => {
    collection.number = data ? data.number +1 : 1;
    db.collection("collections").insert(collection,(function(err, result) {
      if(err){
        console.log(err);
      }
      console.log(result);
      res.json({message:"success", url:"/collection/" + collection.number});
      connection.close();
    }));
  });
}

module.exports = router;