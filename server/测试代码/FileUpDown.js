var express = require('express');
var router = express.Router();
var formidable = require('formidable');

var fs = require('fs');
var path = require('path');

var FilePath = path.join(__dirname, '../files');

//上传文件
router.post('/upload', function(req, res, next) {

  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../tmp');
  form.maxFieldsSize = 10 * 1024 * 1024;
  form.keepExtensions = true;

  function parse() {
    form.parse(req, function(err, fields, file) {

      })
  }

  fs.access(FilePath, function(err) {
    if (err) {
      fs.mkdirSync(FilePath);
    }
    parse();
  });
});

//下载文件
router.get('/download/:name', function(req, res, next) {
  var filename = req.params.name;
  var filePath = path.join(FilePath, filename);
  var fileStat = fs.statSync(filePath);
  if (fileStat.isFile()) {
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.send('404');
  }
});

//获取文件列表
router.get('/files', function(req, res, next) {
  fs.readdir(FilePath, function(err, results) {
    if (err) {
      return res.status(500).send({
        success: 1,
        msg: 'something wrong happens',
        files: [],
      });
    } else {
      var files = [];
      if (results.length > 0) {
        results.forEach(function(file) {
          if (fs.statSync(path.join(FilePath, file)).isFile() && !(/(^|\/)\.[^\/\.]/g).test(file)) {
            files.push(file);
          }
        });
      }
      return res.status(200).send({
        success: 0,
        msg: 'success',
        files: files,
      });
    }
  });
});

module.exports = router;
