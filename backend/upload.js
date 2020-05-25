var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, '')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, datetimestamp + '.' + makeid(5) + '.jpg');
    }
 });

exports.upload = multer({ //multer settings
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/jpeg') {
     req.fileValidationError = 'goes wrong on the mimetype';
     return cb(null, false, new Error('goes wrong on the mimetype'));
    }
    cb(null, true);
   }, 
   limits: { fileSize: 10000000 }
}).single('file');

function makeid(length) {
  var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}