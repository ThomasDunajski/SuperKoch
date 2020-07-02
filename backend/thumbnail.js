var sharp = require('sharp');
 
exports.create = function(path, newPath){ 
  sharp(path)
    .resize(200, 200)
    .toFile(newPath, function(err) {
      if(err) console.log(err);
    });
}
