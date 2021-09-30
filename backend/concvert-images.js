const fs = require('fs');
var sharp = require('sharp');

const dir = fs.opendirSync(process.argv[2]);
let dirent;
while ((dirent = dir.readSync()) !== null) {
  console.log(process.argv[2] + dirent.name.replace('.jpg', '.webp'));
  sharp(process.argv[2] + '\\' + dirent.name)
    .webp({ quality: 80 })
    .toFile((process.argv[2] + '\\' + dirent.name).replace('.jpg', '.webp'))
    .catch((err) => {
      console.log(err.message);
    });
}
dir.closeSync();
