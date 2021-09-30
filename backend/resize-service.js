var sharp = require('sharp');

exports.createThumbnail = function (path, newPath) {
  createResizedCopy(path, newPath, 400, 400);
};

exports.createLarge = function (path, newPath) {
  createResizedCopy(path, newPath, 1200, 1200);
};

exports.createWide = function (path, newPath) {
  createResizedCopy(path, newPath, 1920, 1080);
};

function createResizedCopy(path, newPath, sizeX, sizeY) {
  sharp(path)
    .resize(sizeX, sizeY)
    .webp({ quality: 80 })
    .toFile(newPath)
    .catch((err) => {
      console.log(err.message);
    });
}
