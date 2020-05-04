var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

function addIndex(option){
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, con) {
      var db = con.db("SuperKoch");
      db.collection("Recepies").createIndex(option,
      function(err, res) {
        if (err) {
          console.log(err)
        }
        else{
          console.log(res);
        }
        con.close();
    });
  });
};

function createIndex(){
  addIndex({name: "text"});
  addIndex({tags: 1});
}

// read connection string with credentials from json
var url = JSON.parse(fs.readFileSync('config.json', 'utf8')).url;
createIndex();