var dbService = require("./db-service");
var ObjectId = require('mongodb').ObjectId; 

exports.resolveTags = (tagIds) => {
    if (!tagIds) return [];
    var idObjects = [];
    tagIds.forEach(tagId =>{
      idObjects.push(new ObjectId(tagId));
    }); 
    return dbService.find({collection:"Tags", query:{_id: {$in:idObjects}}});
  }