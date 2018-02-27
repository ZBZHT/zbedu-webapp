const express = require('express');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
var archiver = require('archiver');
const formidable = require('formidable');

const fs_ext = require('../utils/fs_ext')();
const core = require('../utils/core');
const router = express.Router();

var sysInfo = core.getServerInfo();
var rootDir = path.resolve(__dirname,"../app/uploads");
var zipDir = path.join(path.resolve(__dirname,"../app/uploads"), "zip");
//var uploadDir = path.join(path.resolve(__dirname,"../"), "uploads");
var zipName = "moreFiles.zip";

//设置跨域请求
router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", ' 3.2.1');
  if (req.method == "OPTIONS") res.sendStatus(204);/*让options请求快速返回*/
  else next();
});

router.get('/', function(req, res) {
    res.render('fileUpDown');
});

//文件上传
router.post('/upload', function(req, res, next) {

  let form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../app/uploads');//设置文件上传存放地址
  form.maxFieldsSize = 300 * 1024 * 1024; //设置最大300M
  form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
      //旧名字
      let oldName = files.resource.name;
      //新名字
      let oldPath = files.resource.path;

      //取文件全名名称
      function GetFileName(filePath) {
        if (filePath != "") {
          var names = filePath.split("\\");
          names[names.length - 1] = oldName;
          return names;
        }
      }
      let newPath = GetFileName(oldPath).join('//');
      console.log(newPath);
      //改名   path: 'D:\\zbedu-webapp-master2.23\\server\\login\\app\\uploads\\upload_8ba6e0974e8e7d19a6ca242a303eb9ee.exe',
      fs.rename(oldPath,newPath,function (err) {
        if(err){
          throw  Error("改名失败");
        }
        res.status(200).send({
          success: 0,
          msg: 'upload success',
        });
      });

    });
});

//下载单个文件
router.get('/downloadSingle',function(req, res, next){
  var currDir = path.normalize(req.query.dir),
    comefrom = req.query.comefrom,
    fileName = req.query.name,
    currFile = path.join(currDir,fileName),
    fReadStream;

  fs.exists(currFile,function(exist) {
    if(exist){
      res.set({
        "Content-type":"application/octet-stream",
        "Content-Disposition":"attachment;filename="+encodeURI(fileName)
      });
      fReadStream = fs.createReadStream(currFile);
      fReadStream.on("data",(chunk) => res.write(chunk,"binary"));
      fReadStream.on("end",function () {
        res.end();
        //删除生成的压缩文件
        if(comefrom == "archive"){
          setTimeout(() => fs.unlink(path.join(zipDir,zipName)), 100);
        }
      });
    }else{
      res.set("Content-type","text/html");
      res.send("file not exist!");
      res.end();
    }
  });
});

//获取下载文件的地址
router.post('/download',function(req, res){
  console.log(res.body.downloadName);
  var currDir = path.normalize(req.body.dir),
    fileArray = req.body.fileArray,
    filesCount = 0,     //非文件夹文件个数
    fileNameArray = [];

  //将文件和文件夹分开命名
  fileArray.forEach(function(file) {
    if(file.type == 1){
      filesCount++;
      fileNameArray.push(file.name);
    }else{
      fileNameArray.push(path.join(file.name,"**"));  //文件夹格式：folderName/**
    }
  });

  if(fileArray.length == 0){
    res.send({"code":"fail", "summary":"no files"});
    return;
  }

  if(filesCount == 1 && fileNameArray.length == 1){
    //只有一个文件的时候直接走get
    var downloadUrl = "/downloadSingle?dir="+encodeURIComponent(currDir)+"&name="+encodeURIComponent(fileNameArray[0]);
    res.send({"code":"s_ok", "url":downloadUrl});
  }else{
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
});

/*//文件下载
router.get('/download', function(req, res) {
  let path = 'public/upload/file.txt';  // 文件存储的路径
  // filename:设置下载时文件的文件名，可不填，则为原名称
  res.download('../public/uploads/file.txt', function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
});*/

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
  var currDir = "",
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
      var fileDetailArray = [];

      function getFileInfo(fileName){
        return new Promise(function(resolve,rejected){
          fs.lstat(path.join(currDir,fileName),function(err,stats){
            if(!err){
              var obj = {
                name: fileName,
                type: stats.isFile() ? 1:0,
                isFile: stats.isFile(),
                isDirectory: stats.isDirectory(),
                size: (stats.size) / 1024,
                birthtime: core.formatDate("yyyy-MM-dd hh:mm:ss",stats.birthtime),
                ctime: core.formatDate("yyyy-MM-dd hh:mm:ss",stats.ctime),   //create time
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
          var result = {"code":"s_ok", "path":currDir, "var":fileDetailArray, sysInfo:sysInfo};
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
            var forward;
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
          var result = {"code":"failed", "path":currDir, "summary":err};
          res.send(result);
        })
        .done();
    })
    .catch(function(err){
      var result = {"code":"failed", "path":currDir, "summary":err};
      res.send(result);
    })
    .done();
});

module.exports = router;
