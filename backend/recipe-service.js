var dbService = require("./db-service");
var tagsController = require('./tags-controller');

exports.getRecipe = async  (number) => {
  var recipe = await dbService.findOne({number:number});
  recipe.tags = await tagsController.resolveTags(recipe.tags);
  return recipe;
}

exports.getRecipes = async  (recipeNumbers) => {
  const recipes = await Promise.all(recipeNumbers.map(async (number) => await exports.getRecipe(number)));
  return recipes;
}