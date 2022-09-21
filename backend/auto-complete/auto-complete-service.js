const tokenizer = require('./tokenizer.js');
var dbService = require('.././db-service');

save = async (str) => {
  const entry = {
    fullText: str.trim(),
    tokens: tokenizer.tokenize(str),
  };
  var connection = await dbService.getDB();
  var db = connection.db('rezeptekiste');
  try {
    await db
      .collection('auto-complete-data')
      .replaceOne({ fullText: str }, entry, { upsert: true });
    connection.close();
  } catch (error) {
    console.log(error);
  }
};

remove = async (str) => {
  if (!str) return;
  const fullText = str.trim();
  var connection = await dbService.getDB();
  var db = connection.db('rezeptekiste');
  try {
    await db.collection('auto-complete-data').deleteOne({ fullText: str });
  } catch (error) {
    console.log(error);
  } finally {
    connection.close();
  }
};

find = async (str) => {
  const searchStr = str.trim().toLowerCase();
  var connection = await dbService.getDB();
  var db = connection.db('rezeptekiste');
  try {
    reults = await db
      .collection('auto-complete-data')
      .find({ tokens: searchStr })
      .project({ _id: 0, fullText: 1 })
      .sort({ fullText: 1 })
      .toArray();
    results = reults
      .sort(
        (x, y) =>
          x.fullText.toLowerCase().indexOf(searchStr) -
          y.fullText.toLowerCase().indexOf(searchStr)
      )
      .splice(5);
    return reults;
  } catch (error) {
    console.log(error);
  } finally {
    connection.close();
  }
};
module.exports = { find, save, remove };
