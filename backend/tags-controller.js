var dbService = require('./db-service');
var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
  var tags = await dbService.find({
    collection: 'tags',
    query: {},
    projection: { _id: 1 },
  });
  res.json(tags);
});

router.post('/', async (req, res) => {
  var tag = req.body.tag;
  var connection = await dbService.getDB();
  var db = connection.db('rezeptekiste');
  db.collection('tags').insertOne(tag, function () {
    connection.close();
  });
  res.json(tag);
});

router.get('/by-category', async (req, res) => {
  var tags = await dbService.find({
    collection: 'tags',
    query: {},
  });
  result = [];
  for (const tag of tags) {
    if (!result[tag.category.number]) result[tag.category.number] = [];
    result[tag.category.number].push(tag);
  }
  result = result.filter((value) => value != null);
  res.json(result);
});

module.exports = router;
