var dbService = require("./db-service");
var ObjectId = require('mongodb').ObjectId; 
var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
   var tags = await dbService.find({collection:"tags", query:{}, sort:{name:1}});
   res.json(tags);
});

router.post('/',  async (req, res) => {
  var tag = req.body.tag;
  var connection = await dbService.getDB();
  var db = connection.db("rezeptekiste");
  db.collection("tags").insertOne(tag, function(){
    connection.close();
  });
  res.json(tag);
});

module.exports = router;