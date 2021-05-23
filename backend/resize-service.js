var sharp = require('sharp');
 
exports.createThumbnail = function(path, newPath){ 
  createResizedCopy(path, newPath, 400, 400, 50)
}

exports.createLarge = function(path, newPath){ 
  createResizedCopy(path, newPath, 1200, 1200)
}

exports.createWide = function(path, newPath){ 
  createResizedCopy(path, newPath, 1920 , 1080 )
}

function createResizedCopy(path, newPath, sizeX, sizeY, quality = 80){
  // newPath = newPath.replace('.jpg', '.webp')
  sharp(path)
    .resize(sizeX, sizeY)
    .webp({quality:quality})
    .toFile(newPath)
    .catch((err) =>{
      console.log(err.message);
    });
}