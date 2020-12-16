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
app.use('/collections', collectionController);
app.use('/tags', tagsController);
app.use('/images', imagesController);
app.use('/recipes', recipeController);

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

sendIndex = (res) =>{
  res.status(200).sendFile(indexPath); 
} 

//start server
var server_port = process.env.PORT || 8080;
app.listen(server_port, function () {
  console.log("Listening on port " , server_port);
});