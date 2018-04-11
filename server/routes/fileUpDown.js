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
const rootDir = path.resolve(__dirname,"../app/uploads");
const uploadsPath = "../app/uploads/";
const zipDir = path.join(path.resolve(__dirname,"../app/uploads"), "zip");
//var uploadDir = path.join(path.resolve(__dirname,"../"), "uploads");
const zipName = "moreFiles.zip";

//文件上传
router.post('/upload', function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.uploadDir = "../app/uploads/";//设置文件上传存放地址
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
  }
catch (e) {
    res.status(404).send({
      err: 1,
      msg: 'upload err',
    });
  }
});

//文件下载
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
            success: 0,
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

//读取目录文件并排序

router.get('/loadFile',function(req, res) {
  let currDir = "",
    order = "";

  if(!req.body.dir){
    currDir = rootDir;
  }else{
    currDir = path.join(req.body.dir,req.body.folderName);
  }

  if(!req.body.order){
    order = "name";
  }else{
    order = req.body.order;
  }
  res.set("Content-type","text/json");
  fs_ext.readdir(currDir)
    .then(function(files){
      return _.clone(files);
    })
    .then(function(fileArray){
      let fileDetailArray = [];

      function getFileInfo(fileName){
        return new Promise(function(resolve,rejected){
          fs.lstat(path.join(currDir,fileName),function(err,stats){
            if(!err){
              let obj = {
                name: fileName,
                //type: stats.isFile() ? 1:0,
                //isFile: stats.isFile(),
                //isDirectory: stats.isDirectory(),
                size: ((stats.size) / 1000000).toFixed(2),
                birthtime: moment(stats.birthtime).format('YYYY-MM-DD, h:mm:ss'),
                //ctime: core.formatDate("yyyy-MM-dd hh:mm:ss",stats.ctime),   //create time
                //mtime: core.formatDate("yyyy-MM-dd hh:mm:ss",stats.mtime)    //modify time
              };
              fileDetailArray.push(obj);
              resolve();
            }else{
              if(err.errno = -4048){//无权限访问的文件夹
                resolve();
              }else{
                rejected(err);
              }
            }
          })
        });
      }

      Promise.all(fileArray.map(getFileInfo))
        .then(function() {
          //TODO:sort 按文件夹在上的顺序
          fileDetailArray.sort(sortOrder);
          let result = {"code":"s_ok", "path":currDir, "var":fileDetailArray, sysInfo:sysInfo};
          res.send(result);
          //console.log(result);
          //排序
          function sortOrder(a,b) {
            if(a.type != b.type){
              if(a.type > b.type){   //文件夹总是排在上面
                return 1;
              }else{
                return -1;
              }
            }

            //文件类型相同再第二级比较
            let forward;
            switch (order) {
              case "size":
                if(a.size >= b.size){
                  forward = -1;
                }else{
                  forward = 1;
                }
                break;
              case "birthtime":
                if(a.birthtime >= b.birthtime){
                  forward = -1;
                }else{
                  forward = 1;
                }
                break;
              case "ctime":
                if(a.ctime >= b.ctime){
                  forward = -1;
                }else{
                  forward = 1;
                }
                break;
              default:
                if(a.name <= b.name){
                  forward = -1;
                }else{
                  forward = 1;
                }
                break;
            }
            return forward;
          }
        })
        .catch(function(err){
          let result = {"code":"failed", "path":currDir, "summary":err};
          res.send(result);
        })
        .done();
    })
    .catch(function(err){
      let result = {"code":"failed", "path":currDir, "summary":err};
      res.send(result);
    })
    .done();
});

module.exports = router;
