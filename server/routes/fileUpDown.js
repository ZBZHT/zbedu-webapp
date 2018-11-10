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
const ResourceCenter = require('../app/models/ResourceCenter');
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
      //console.log(fileName);
      //新名字
      let oldPath = files.file.path;
      let newPath = uploadsPath + fileName;
      //console.log(oldPath);
      //console.log(newPath);
      if (fields.label === '全部教程') {
        fields.label = 1
      } else if (fields.label === '教学课件') {
        fields.label = 2
      } else if (fields.label === '教学微课') {
        fields.label = 3
      } else if (fields.label === '其他教材') {
        fields.label = 4
      }

      fs.rename(oldPath, newPath, function (err) {
        if (err) {
          throw  Error("改名失败");
        }
        fs.stat(newPath, function(err,stats){  //获取文件信息
          if(err){
            return err;
          }
          let p1 = new Promise((resolve, reject) => {
            ResourceCenter.find({
              title: 'upload',
            }).then(function (result) {
              console.log('11');
              if (result === null || result.length === 0) {
                let resourceCenter = new ResourceCenter({
                  title: 'upload',
                  children: [],
                });
                resourceCenter.save(function (err) {
                  if (err) {
                    console.log(err);
                    res.status(200).send({code:1, Msg: 'resourceCenter创建失败', });
                  } else {
                    resolve('已创建')
                  }
                })
              } else {
                resolve('已有resourceCenter');
              }
            });
          });

          Promise.all([p1]).then((result) => {
            ResourceCenter.findOneAndUpdate({
              title: 'upload'
            }, {
              $push : {
                children: {
                  personName: req.session.users.username,
                  fileName: fileName,
                  size: ((stats.size) / 1000000).toFixed(2),
                  birthTime: moment(stats.birthtime).format('YYYY-MM-DD, h:mm:ss'),
                  fileType: fields.label,
                }
              }
            }, function (err) {
              if (err) {
                console.log(err);
                res.status(200).send({code:1, Msg: '更新失败', });
              } else {
                //console.log('修改成功IDNo');
                res.status(200).send({code:0, Msg: '更新成功', });
              }
            });

          }).catch((error) => {
            console.log(error)
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
  let delData = JSON.parse(req.query.delData);
  let filePath = uploadsPath + delData.fileName;
  //console.log(delData);
  //console.log(filePath);
  fs.unlink(filePath, function (error) {
    if (error) {
      console.log(error);
    }
    console.log('删除文件成功');
    ResourceCenter.findOneAndUpdate({
      title: 'upload'
    }, {
      $pull: {
        children: delData
      }
    }, function (err) {
      if (err) {
        console.log(err);
        res.status(200).send({code: 1, Msg: '更新失败',});
      } else {
        console.log('修改成功IDNo');
        res.status(200).send({code: 0, msg: '删除文件成功',});
      }
    });
  });

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
  ResourceCenter.find({
    title: 'upload',
  }).then(function (result) {
    //console.log(result[0].children);
    res.status(200).send({ code: 0, result: result[0].children, msg: '获取文件信息成功' });
  });

});

module.exports = router;
