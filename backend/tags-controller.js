dbService = require("./db-service");

exports.getTags = async (req, res) => {
    var tags = await dbService.find({collection:"Tags", query:{}, sort:{name:1}});
    res.json(tags);
  }

exports.addTag = async (req, res) => {
    var tag = req.body.tag;
    var connection = await dbService.getDB();
    var db = connection.db("SuperKoch");
    db.collection("Tags").insertOne(tag, function(){
      connection.close();
    });
    res.json(tag);
  }

  exports.resolveTags = (tagIds) => {
    if (!tagIds) return [];
    var idObjects = [];
    tagIds.forEach(tagId =>{
      idObjects.push(new ObjectId(tagId));
    }); 
    return dbService.find({collection:"Tags", query:{_id: {$in:idObjects}}});
  }