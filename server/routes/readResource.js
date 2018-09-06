const express = require('express');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const archiver = require('archiver');
const formidable = require('formidable');
const moment = require('moment');
const core = require('../utils/core');
const router = express.Router();
const resourcePath = "../public/resource/";
const resPath = "/resource/";
const ffmpeg = require('ffmpeg');

/* GET index.json */
router.post('/getPPT', function (req, res) {
  //console.log(req.body);
  let pList = {
    courseList:[],
    textBookList:[],
    workPageList:[],
  };
  let fileName = req.body.data.fileName;

  if (fileName !== '') {
    //处理路径
    let fileNameArr1 = fileName.split(".");
    //console.log(fileNameArr1);
    fileName = fileNameArr1[0];
    //console.log(fileName);
    let fileNameA = fileName.charAt(fileName.length-1);
    if (fileNameA === '/') {
      fileName = fileName.substring(0,fileName.length - 1)
    }
    //console.log(fileName);
    let fileNameArr = fileName.split("/");
    if (fileNameArr[1] === '纯电动汽车' || fileNameArr[0] === '我的课堂') {

    } else {
      fileName = fileName + '/' + fileNameArr[fileNameArr.length-1]
    }
    let fileName2 = fileName + '-课件';
    let fileName1 = fileName + '-教材';
    let fileName3 = fileName + '-工作页';
    //console.log(resourcePath + fileName2);

    let p1 = new Promise((resolve, reject) => {
      //读取课件列表
      fs.readdir(resourcePath + fileName2, function (err, stats2) {
        //console.log(stats2);
        //console.log(resourcePath + fileName2);
        if (stats2 && stats2.length>0) {

          let num = [];
          if (err) {
            console.log(err);
            //res.status(404).send({code: 1, msg: '查找文件错误'});
          } else {
            let name1 = stats2[0].split(".");
            let name2 = name1[name1.length-1];
            let name3 = name1[0].replace(/[0-9]/ig,"");
            //console.log(name2);
            //console.log(name3);

            stats2.forEach(function (item, stats2) {
              num.push(Number(item.replace(/[^0-9]/ig,"")));
            });
            let statsL = num.sort(function(a,b){
              if (a>b) {
                return 1;
              }else if(a<b){
                return -1
              }else{
                return 0;
              }
            });
            //console.log(stats1);
            let data = '';
            statsL.forEach(function (item,i, stats2) {
              data = resPath + fileName2 + "/" + name3 + item + '.' + name2;
              pList.courseList.push({img: data});
            });
            //console.log(pList.courseList);
            resolve('读取-课件-成功');
          }
        } else {
          resolve('没有-课件');
        }
      });
    });

    let p2 = new Promise((resolve, reject) => {
      //读取教材列表
      fs.readdir(resourcePath + fileName1, function (err, stats1) {
        //console.log(stats1);
        //console.log(resourcePath + fileName1);
        if (stats1 && stats1.length>0) {
          let num = [];
          if (err) {
            console.log(err);
            //res.status(404).send({code: 1, msg: '查找文件错误'});
          } else {
            let name1 = stats1[0].split(".");
            let name2 = name1[name1.length-1];
            let name3 = name1[0].replace(/[0-9]/ig,"");
            //console.log(name2);
            //console.log(name3);

            stats1.forEach(function (item, stats1) {
              num.push(Number(item.replace(/[^0-9]/ig,"")));
            });
            let statsL1 = num.sort(function(a,b){
              if (a>b) {
                return 1;
              }else if(a<b){
                return -1
              }else{
                return 0;
              }
            });
            //console.log(stats1);
            let data = '';
            statsL1.forEach(function (item,i, stats1) {
              data = resPath + fileName1 + "/" + name3 + item + '.' + name2;
              pList.textBookList.push({img: data});
            });
            //console.log(pList.textBookList);
            resolve('读取-教材-成功');
          }
        } else {
          resolve('没有-教材');
        }
      });
    });

    let p3 = new Promise((resolve, reject) => {
      //读取工作页列表
      fs.readdir(resourcePath + fileName3, function (err, stats3) {
        //console.log(stats3);
        //console.log(resourcePath + fileName3);
        if (stats3 && stats3.length>0) {
          let num = [];
          if (err) {
            console.log(err);
            //res.status(404).send({code: 1, msg: '查找文件错误'});
          } else {
            let name1 = stats3[0].split(".");
            let name2 = name1[name1.length-1];
            let name3 = name1[0].replace(/[0-9]/ig,"");
            //console.log(name2);
            //console.log(name3);

            stats3.forEach(function (item, stats3) {
              num.push(Number(item.replace(/[^0-9]/ig,"")));
            });
            let statsL2 = num.sort(function(a,b){
              if (a>b) {
                return 1;
              }else if(a<b){
                return -1
              }else{
                return 0;
              }
            });
            //console.log(stats1);
            let data = '';
            statsL2.forEach(function (item,i, stats3) {
              data = resPath + fileName3 + "/" + name3 + item + '.' + name2;
              pList.workPageList.push({img: data});
            });
            //console.log(pList.workPageList);
            resolve('读取-工作页-成功');
          }
        } else {
          resolve('没有-工作页');
        }
      });
    });

    Promise.all([p1, p2, p3]).then((msg) => {
      //console.log(msg);
      res.status(200).send({ result: pList, code: 0, msg: msg});
    }).catch((error) => {
      console.log(error)
    });

  } else {
    res.status(404).send({code: 1, msg: '路径为空'});
  }

});

router.post('/getVideo', function (req, res) {
  console.log(__dirname);
  let fileUrl = req.body.fileUrl;
  /*res.writeHead(200, {'Content-Type': 'video/mp4'});
  var rs = fs.createReadStream(resourcePath + fileUrl);
  rs.pipe(res);*/


  try {
    new ffmpeg(resourcePath + fileUrl, function (err, video) {
      if (!err) {
        console.log(video.metadata.video);
      } else {
        console.log('Error: ' + err);
      }
    });
  } catch (e) {
    console.log(e.code);
    console.log(e.msg);
  }



    /*var file = path.resolve(resourcePath + fileUrl);
    fs.stat(file, function(err, stats) {
      if (err) {
        console.log(err);
        console.log('111错误');
      }
      var range = req.headers.range;
      if (!range) {
        // 416 Wrong range
        return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });*/



  });


module.exports = router;
