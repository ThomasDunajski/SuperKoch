var dbService = require('./db-service');
var tagsService = require('./tags-service');

exports.getRecipe = async (number) => {
  var recipe = await dbService.findOne({ number: number });
  recipe.tags = await tagsService.resolveTags(recipe.tags);
  return recipe;
};

exports.getRecipes = async (recipeNumbers) => {
  const recipes = await dbService.find({
    collection: 'recipes',
    query: { number: { $in: recipeNumbers } },
  });
  return recipes;
};

exports.getAllRecipeTeaserData = async () => {
  const recipeIds = await dbService.find({
    collection: 'recipes',
    projection: { name: 1, number: 1, images: 1 },
  });
  return recipeIds;
};

exports.getNumber = async (name) => {
  try {
    var recipeNumber = await dbService.findOne({ name: name });
    return recipeNumber.number;
  } catch (error) {
    return NaN;
  }
};
