var dbService = require("./db-service");
var recipeService = require("./recipe-service");

exports.getCollection = async  (req, res) => {
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
}

exports.getCollections = async  (req, res) => {
  let options = {collection: "collections", query:{}, projection:{name:1,imageUrl:1, number:1, text:1}}
  collections = await dbService.find(options)
  res.json(collections);
}

