const express = require('express');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const archiver = require('archiver');
const formidable = require('formidable');
const moment = require('moment');

const fs_ext = require('../utils/fs_ext')();
const core = require('../utils/core');
const router = express.Router();

const sysInfo = core.getServerInfo();
const resourcePath = "../app/uploads/resource/";
const uploadsPath = "../app/uploads/resource/";
const CompPath = "../app/uploads/competition";
const zipDir = path.join(path.resolve(__dirname,"../app/uploads"), "zip");
//var uploadDir = path.join(path.resolve(__dirname,"../"), "uploads");
const zipName = "moreFiles.zip";

//资源中心上传
router.post('/upload', function(req, res) {

    let form = new formidable.IncomingForm();
    form.uploadDir = "../app/uploads/resource";//设置文件上传存放地址
    form.maxFieldsSize = 600 * 1024 * 1024; //设置最大600M
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
      //旧名字
      let fileName = files.file.name;
      console.log(fileName);
      //新名字
      let oldPath = files.file.path;
      let newPath = uploadsPath + fileName;
      let fileMsg = [];
      console.log(oldPath);
      console.log(newPath);

      fs.rename(oldPath, newPath, function (err) {
        if (err) {
          throw  Error("改名失败");
        }
        fs.stat(newPath, function(err,stats){  //获取文件信息
          if(err){
            return err;
          }
          let obj = {
            name: fileName,
            size: ((stats.size) / 1000000).toFixed(2),
            birthtime: moment(stats.birthtime).format('YYYY-MM-DD, h:mm:ss'),
          };
          fileMsg.push(obj);
          res.status(200).send({
            fileMsg : fileMsg,
            success : 0,
          });
        });
      });
    });
});

//资源中心下载
router.get('/download', function(req, res) {
  let fileName = req.query.downloadName;
  let currFile = uploadsPath + fileName;
  fs.exists(currFile,function(exist) {
    if(exist){
      res.download( currFile );
    }else{
      res.set("Content-type","text/html");
      res.send("file not exist!");
      res.end();
    }
  });
});
//大赛中心下载
router.get('/downComp', function(req, res) {
  let fileName = req.query.downloadName;
  let currFile = CompPath + fileName;
  //console.log(currFile);
  fs.exists(currFile,function(exist) {
    if(exist){
      res.download( currFile );
    }else{
      res.set("Content-type","text/html");
      res.send("file not exist!");
      res.end();
    }
  });
});

/*//获取下载文件的地址
 router.get('/download',function(req, res){
 let fileName = path.normalize(req.query.downloadName);

 //将文件和文件夹分开命名
 fileArray.forEach(function(file) {
 if(file.type == 1){
 filesCount++;
 fileNameArray.push(file.name);
 }else{
 fileNameArray.push(path.join(file.name,"**"));  //文件夹格式：folderName/!**
 }
 });

 if(fileArray.length == 0){
 res.send({"code":"fail", "summary":"no files"});
 return;
 }

 if(fileName){
 //直接走get
 let downloadUrl = "/downloadSingle?dir="+encodeURIComponent(rootDir)+"&name="+encodeURIComponent(fileName);
 res.send({"code":"s_ok", "url":downloadUrl});
 }else{
 console.log('err');
 //多个文件就压缩后再走get
 var output = fs.createWriteStream(path.join("zip",zipName));
 var archive = archiver.create('zip', {});
 archive.pipe(output);   //和输出流相接
 //打包文件
 archive.bulk([
 {
 cwd:currDir,    //设置相对路径
 src: fileNameArray,
 expand: currDir
 }
 ]);

 archive.on('error', function(err){
 res.send({"code":"failed", "summary":err});
 throw err;
 });
 archive.on('end', function(a){
 //输出下载链接
 var downloadUrl = "/downloadSingle?dir="+encodeURIComponent(zipDir)+"&name="+encodeURIComponent(zipName)+"&comefrom=archive";
 res.send({"code":"s_ok", "url":downloadUrl});
 });
 archive.finalize();
 }
 });*/

//删除文件
router.get('/fileDelete', function (req, res, next) {
  try {
  let fileName = req.query.downloadName;
  let filePath = uploadsPath + fileName;
      if (fileName) {
        if (fs.statSync(filePath).isDirectory()) {// 删除文件夹
          deleteFolder(filePath);
        } else { // 删除单文件
          fs.unlinkSync(filePath);
          res.status(200).send({
            code: 0,
            msg: '删除文件成功',
            fileName: fileName,
          });
        }
      }
  }
  catch (e) {
    res.status(404).send({
      err: 1,
      msg: 'fileDelete err',
    });
  }
});

router.get('/files', function (req, res, next) {
  fs.readdir(FilePath, function (err, results) {
    if (err) {
      return res.status(500).send({
        success: 1,
        msg: 'something wrong happens',
        files: [],
      });
    } else {
      let files = [];
      if (results.length > 0) {
        results.forEach(function (file) {
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

//读取文件
router.get('/loadFile',function(req, res) {
  let fileDetailArray = [];
  //console.log(resourcePath);
  fs.readdir(resourcePath, function (err, files) {
    if (!err) {
      //console.log(files);
      if (files.length !== 0) {
        function start() {
          return new Promise((resolve, reject) => {
            resolve(files);
          });
        }

        start()
          .then(files => {
            files.forEach(function (item, i, files) {
              fs.lstat(resourcePath + files[i], function (err, stats) {
                //console.log(resourcePath + files[i]);
                if (!err) {
                  let obj = {
                    name: files[i],
                    //type: stats.isFile() ? 1:0,
                    //isFile: stats.isFile(),
                    //isDirectory: stats.isDirectory(),
                    size: ((stats.size) / 1000000).toFixed(2),
                    birthtime: moment(stats.birthtime).format('YYYY-MM-DD, h:mm:ss'),
                    //ctime: core.formatDate("yyyy-MM-dd hh:mm:ss",stats.ctime),   //create time
                    //mtime: core.formatDate("yyyy-MM-dd hh:mm:ss",stats.mtime)    //modify time
                  };
                  fileDetailArray.push(obj);
                  //console.log(fileDetailArray);
                }
              });
            });
            return files
          })

          .then(files => {
            setTimeout(function () {
              let result = {code: 0, "var": fileDetailArray, msg: '获取文件信息成功'};
              //console.log(result);
              res.send(result);
            }, 200);

          });
      }
    } else {
      res.status(404).send({ code: 0, msg: '错误', });
    }
  });
});

module.exports = router;
