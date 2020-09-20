var sharp = require('sharp');
 
exports.createThumbnail = function(path, newPath){ 
  createResizedCopy(path, newPath, 400)
}

exports.createLarge = function(path, newPath){ 
  createResizedCopy(path, newPath, 1200)
}


function createResizedCopy(path, newPath, size){
  sharp(path)
    .resize(size, size)
    .toFile(newPath, function(err) {
      if(err) console.log(err.message);
    });
}