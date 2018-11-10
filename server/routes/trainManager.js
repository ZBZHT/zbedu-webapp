const express = require('express');
const router = express.Router();
const Train = require('../app/models/Train');
const OnOffCommand = require('../app/models/OnOffCommand');
const moment = require('moment');
const net = require('net');
const Ip = require('../app/models/Ip');

//定义返回格式
/*let testManageResult;
router.use(function (req, res, next) {
  testManageResult = {
    testQuestion: '',
    testQuestionInfo: ''
  };
  next();
});*/

//获取实训故障开关数据
router.post('/getTrain', function (req, res) {

  let p1 = new Promise((resolve, reject) => {
    if (req.session.users === undefined) {
      res.status(200).send({code: 1, Msg: '登录过期或未登录',});
    } else {
      resolve('已登录')
    }
  });

  Promise.all([p1]).then((result1) => {
    //console.log(result);
    let userID1 = req.session.users.userID;
    let  ee = [
      {num: 1, name: '故障1', onOff: 'off'},
      {num: 2, name: '故障2', onOff: 'off'},
      {num: 3, name: '故障3', onOff: 'off'},
      {num: 4, name: '故障4', onOff: 'off'},
      {num: 5, name: '故障5', onOff: 'off'},
      {num: 6, name: '故障6', onOff: 'off'},
      {num: 7, name: '故障7', onOff: 'off'},
      {num: 8, name: '故障8', onOff: 'off'},
      {num: 9, name: '故障9', onOff: 'off'},
      {num: 10, name: '故障10', onOff: 'off'},
      {num: 11, name: '故障11', onOff: 'off'},
      {num: 12, name: '故障12', onOff: 'off'},
      {num: 13, name: '故障13', onOff: 'off'},
      {num: 14, name: '故障14', onOff: 'off'},
      {num: 15, name: '故障15', onOff: 'off'},
      {num: 16, name: '故障16', onOff: 'off'}
    ];
    Train.findOne({
      userID: userID1
    }).then(function (result) {
      if (result === null) {
        let train = new Train({
          time: moment().format("YYYY-MM-DD HH:mm:ss"),
          userID: userID1,
          historyFault: ee,
          userFault: []
        });
        train.save(function (err) {
          if (err) {
            res.status(200).send({code: 1, Msg: '保存失败',});
          } else {
            res.status(200).send({code: 0, result: ee, Msg: '保存成功',});
          }
        });
      } else {
        res.status(200).send({code: 0, result: result, Msg: '保存成功',});
      }
    });

  }).catch((error) => {
    console.log(error)
  });

});

//开关状态更新
router.post('/updateTrain', function (req, res) {

  let p1 = new Promise((resolve, reject) => {
    if (req.session.users === undefined) {
      res.status(200).send({code: 1, Msg: '登录过期或未登录',});
    } else {
      resolve('已登录')
    }
  });

  Promise.all([p1]).then((result) => {
    //console.log(result);
    let userID1 = req.session.users.userID;
    let trainData1 = req.body.data.trainData;
    Train.findOneAndUpdate({
      userID: userID1,
    }, {
      time: moment().format("YYYY-MM-DD HH:mm:ss"),
      historyFault: trainData1,
    }, function (err) {
      if (err) {
        console.log(err);
        res.status(200).send({code: 1, Msg: '更新失败',});
      } else {
        //console.log('修改成功IDNo');
        res.status(200).send({code: 0, Msg: '保存成功',});
      }
    });

  }).catch((error) => {
    console.log(error)
  });

});

//获取实训故障开关命令
router.post('/getOnOffData', function (req, res) {
  let name1 = req.body.data.courseName;
  console.log(name1);

  OnOffCommand.findOne({
    name: name1
  }).then(function (result) {

    if (result === null) {
      let onOffCommandJSON = require('../app/mock/onOffCommand.json');
      //console.log(onOffCommandJSON[0].name);
      let onOffCommand = new OnOffCommand({
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
        name: onOffCommandJSON[0].name,
        children: onOffCommandJSON[0].children,
      });
      onOffCommand.save(function (err) {
        if (err) {
          console.log('保存失败');
          res.status(200).send({code: 1, Msg: '保存失败',});
        } else {
          console.log('保存成功');
          res.status(200).send({code: 0, result: onOffCommandJSON[0].children, Msg: '保存成功',});
        }
      });

    } else {
      res.status(200).send({code: 0, result: result, Msg: '保存成功',});
    }
  });
});

//控制电路板的开关
router.post('/onOffControl', function (req, res) {
  let command1 = req.body.data.command;
  let SW = req.body.data.courseName;
  let ee = '';
  let hostServer = '';

  let p1 = new Promise((resolve, reject) => { //创建默认指令集合
    OnOffCommand.findOne({
      name: req.body.data.courseName
    }).then(function (result) {
      if (result === null) {
        let onOffCommandJSON = require('../app/mock/onOffCommand.json');
        let onOffCommand = new OnOffCommand({
          time: moment().format("YYYY-MM-DD HH:mm:ss"),
          name: onOffCommandJSON[0].name,
          children: onOffCommandJSON[0].children,
        });
        onOffCommand.save(function (err) {
          if (err) {
            console.log('保存失败');
            res.status(200).send({code: 1, Msg: '保存失败',});
          } else {
            resolve('创建成功')
          }
        });
      } else {
        resolve('已存在')
      }
    });
  });

  let p2 = new Promise((resolve, reject) => {  //查找电路板指令
    OnOffCommand.findOne({
      name: SW
    }).then(function (result) {
      for (let i = 0; i < result.children.length; i++) {
        let obj = result.children[i];
        if (obj.key === command1) {
          let ss = obj.value.split(",");
          ee = new Buffer(ss);
          resolve('成功了2')
        }
      }
    });
  });

  let p3 = new Promise((resolve, reject) => {  //查找电路板指令
    Ip.findOne({
    }).then(function (result) {
      if (result === null) {
        console.log('数据库存储的ip为空');
      } else {
        console.log('获取ip成功');
        let words = (result.Ip).split(".");
        words[3] = '254';
        let a = words.join('.');
        hostServer = a;
        resolve('成功了3')
      }
    })
  });

  Promise.all([p1, p2, p3]).then((result) => { //连接电路板并发送指令
    //console.log(hostServer);
    let client = net.connect({
      port: 8080,
      host: hostServer,
    },function(){ // connect监听器
      //console.log("客户端已连接") ;
      client.write(ee);
    });
    client.on("data", function(data) {
      //console.log(data) ;
      client.end() ;
    });
    client.on("end", function(){
      //console.log("客户端断开连接");
      res.status(200).send({code: 0, Msg: '开-关成功',});
    }) ;

  }).catch((error) => {
    console.log(error)
  });
});

//添加/更新自定义故障
router.post('/addUserTrain', function (req, res) {
  let resData = req.body.data;
  resData.userTrain.onOff = 'off';
  //console.log(resData);
  Train.update(
    {userID: resData.userID,},
    {"$push":{userFault: resData.userTrain}},
    function (err) {
      if (err) {
        console.log(err);
        res.end(JSON.stringify({code: 1}));
      } else {
        res.end(JSON.stringify({code: 0}));
      }
    });
});

//编辑自定义故障
router.post('/addUserTrain', function (req, res) {
  let resData = req.body.data;
  resData.userTrain.onOff = 'off';
  Train.update(
    {userID: resData.userID,},
    {"$push":{userFault: resData.userTrain}},
    function (err) {
      if (err) {
        console.log(err);
        res.end(JSON.stringify({code: 1}));
      } else {
        res.end(JSON.stringify({code: 0}));
      }
    });
});

//删除自定义故障
router.post('/delUserTrain', function (req, res) {
  let resData = req.body.data;
  //console.log(resData);
  Train.update(
    {userID: resData.userID,},
    {"$pull":{userFault:{userTrainName:resData.userTrainName}}},
    function (err) {
      if (err) {
        console.log(err);
        res.end(JSON.stringify({code: 1}));
      } else {
        res.end(JSON.stringify({code: 0}));
      }
    });
});


module.exports = router;
