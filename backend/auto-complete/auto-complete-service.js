const tokenizer = require('./tokenizer.js');
var dbService = require(".././db-service");

add = async (str)=>{
    const entry = {
        fullText: str.trim(),
        tokens: tokenizer.tokenize(str)
    }
    var connection = await dbService.getDB();
    var db = connection.db("rezeptekiste");
    try {
        await db.collection("auto-complete-data").replaceOne({fullText: str}, entry, {upsert: true});
        connection.close();
    } catch (error) {
        console.log(error);
    }
}

remove = async (str)=>{
    const fullText = str.trim();
    var connection = await dbService.getDB();
    var db = connection.db("rezeptekiste");
    try {
        await db.collection("auto-complete-data").deleteOne({fullText: str});
    } catch (error) {
        console.log(error);
    }
    finally{
        connection.close();
    }
}

find = async (str)=>{
    const fullText = str.trim();
    var connection = await dbService.getDB();
    var db = connection.db("rezeptekiste");
    try {
        reults = await db.collection("auto-complete-data").find({tokens: str}).project({_id:0, fullText:1}).limit(5).toArray();
        return reults
    } catch (error) {
        console.log(error);
    }
    finally{
        connection.close();
    }
}
module.exports = {find:find, add:add,remove:remove};