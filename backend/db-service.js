var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var fs = require('fs');
var url = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8')).url;

exports.getDB = () =>{
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, con) {
      err 
      ? reject(err) 
      : resolve(con);
  });
  });
};

exports.find = (options) => {
  // collection, query, limit, skip, projection
  return new Promise(async (resolve, reject) => {
    if (!options.limit) options.limit = 0;
    if (!options.skip) options.skip = 0;
    if (!options.projection) options.projection = {};
    if (!options.sort) options.sort = {};
    const connection = await exports.getDB();
    const db = connection.db("SuperKoch");
     db
     .collection(options.collection)
     .find(options.query)
     .project(options.projection )
     .skip(options.skip)
     .limit(options.limit)
     .sort(options.sort)
     .toArray(function(err, data) {
       connection.close();
        err 
           ? reject(err) 
           : resolve(data);
      });
  });
};

exports.findOne =  (query) => {
  return new Promise(async (resolve, reject) => {

    const connection = await exports.getDb();
    const db = connection.db("SuperKoch");
     db
     .collection('recipes')
     .findOne(query, function(err, data) {
        err 
           ? reject(err) 
           : resolve(data);
        connection.close();
      });
  });
};