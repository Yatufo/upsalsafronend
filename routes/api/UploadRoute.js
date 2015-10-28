
var multer = require('multer');
var s3 = require('multer-s3');
var ctx = require('../util/conf.js').context();
var path = require('path')

exports.multer = multer({
  storage: s3({
    dirname: '/',
    bucket: ctx.s3.bucket,
    secretAccessKey: ctx.s3.secretAccessKey,
    accessKeyId: ctx.s3.accessKeyId,
    region: ctx.s3.region,
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
})



exports.uploadImage = function(req, res, next){
  res.send('Successfully uploaded!');
}
