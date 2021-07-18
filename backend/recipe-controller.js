var dbService = require("./db-service");
var recipeService = require("./recipe-service");
const autoCompleteService = require('./auto-complete/auto-complete-service');
var express = require('express')
var router = express.Router()
const url = require('url');

router.post('/', async (req, res) =>{
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
  var connection = await dbService.getDB();
  var db = connection.db("rezeptekiste");
  db.collection("recipes").update({number:recipe.number}, recipe, function(err, result){
    if(err){
      console.log(err);
    }
    res.json({message:"success", url:"/recipe/" + recipe.number});
    connection.close();
  });
}

async function addRecipe(recipe, req, res){
  var connection = await dbService.getDB();
  var db = connection.db("rezeptekiste");
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
      autoCompleteService.save(recipe.name)
      res.json({message:"success", url:"/recipe/" + recipe.number});
      connection.close();
    }));
  });
}

router.post('/get-multiple', async  (req, res) => {
  var recipeNumbers = req.body.recipeNumbers;
  var recipes = await recipeService.getRecipes(recipeNumbers)
  res.json(recipes);
});

router.post('/search', async (req, res) => {
  const selectedTags = req.body.selectedTags.length > 0 ? {tags: {$all: req.body.selectedTags}} : {};
  const season = req.body.season ?  {season: new Date().getMonth() + 1}: {};
  const skip = req.body.skip ?  parseInt(req.body.skip): 0;
  const searchName = req.body.searchName ?{$text: {$search:req.body.searchName}} : {};
  const projection = {name:1, images:1, number:1, _id:0}
  const limit = req.body.limit ?  parseInt(req.body.limit): 0;
  if (selectedTags === undefined){
      res.statusMessage = "selectedTags undefined";
      res.status(400).send();
  }
  else
  {
    var recipes = await dbService.find({
      collection:"recipes", 
      query:{$and:[searchName,{$and:[selectedTags, season]}]}, 
      limit:limit, 
      skip:skip, 
      projection:projection
    });
    res.json(recipes);
  }
});

router.get('/teaser-data/all', async  (req, res) => {
  var recipeIds = await recipeService.getAllRecipeTeaserData();
  res.json(recipeIds);
});

router.get('/number', async  (req, res) => {
  const queryObject = url.parse(req.url,true).query;
  const name = queryObject.name;
  var recipeIds = await recipeService.getNumber(name);
  res.json(recipeIds);
});

router.get('/:recepieId', async (req, res) => {
  var recepieId = parseInt(req.params.recepieId);
  var recipe = await recipeService.getRecipe(recepieId)
  res.json(recipe);
});
module.exports = router;