// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var path = require('path');

// controllers
var tagsController = require('./tags-controller');
var recipeController = require('./recipe-controller');
var collectionController = require('./collection-controller');
var imagesController = require('./images-controller');

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// routes
app.get('/tags', tagsController.getTags);
app.post('/tags', tagsController.addTag);
app.post('/recepie', recipeController.addRecipe);
app.post('/recipes', recipeController.getRecipes);
app.get('/all-recipe-teaser', recipeController.getRecipeIds);
app.get('/recepie/:recepieId', recipeController.getRecipe);
app.post('/recepie/search', recipeController.searchRecipe);
app.post('/images/upload', imagesController.upload);
app.delete('/images/:imageId', imagesController.deleteImage);
app.get('/collections', collectionController.getCollections);
app.get('/collections/:collectionId', collectionController.getCollection);
app.post('/collections', collectionController.saveCollection);

// serve the frontend.
var path = require('path');
const indexPath = path.join(__dirname, '/public/index.html');
function sendIndex(req, res){
  res.status(200).sendFile(indexPath); 
} 

app.get('/', (req, res) => {
  sendIndex(res);
});

app.use((req, res) => {
  sendIndex(res);
 });

function sendIndex(res){
  res.status(200).sendFile(indexPath); 
} 

//start server
var server_port = process.env.PORT || 8080;
app.listen(server_port, function () {
  console.log("Listening on port " , server_port);
});