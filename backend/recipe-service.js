var dbService = require("./db-service");
var tagsService = require('./tags-service');

exports.getRecipe = async  (number) => {
  var recipe = await dbService.findOne({number:number});
  recipe.tags = await tagsService.resolveTags(recipe.tags);
  return recipe;
}

exports.getRecipes = async  (recipeNumbers) => {
  const recipes = await Promise.all(recipeNumbers.map(async (number) => await exports.getRecipe(number)));
  return recipes;
}

exports.getAllRecipeTeaserData = async  () => {
  const recipeIds = await dbService.find({collection:"recipes", projection:{name:1,number:1,imageUri:1}});
  return recipeIds;
}