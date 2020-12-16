var MongoClient = require('mongodb').MongoClient;
var url = '';

function addIndex(option){
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, con) {
      var db = con.db("rezeptekiste");
      db.collection("recipes").createIndex(option,
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
  addIndex({name: "text", "ingredients.name": "text"});
  addIndex({tags: 1});
}

createIndex();