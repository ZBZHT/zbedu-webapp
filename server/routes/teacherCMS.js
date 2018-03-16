const express = require('express');
const router = express.Router();
const _ = require('lodash');
const fs = require("fs");
const User = require('../app/models/User');

//设置跨域请求
{
// 判断origin是否在域名白名单列表中
  function isOriginAllowed(origin, allowedOrigin) {
    if (_.isArray(allowedOrigin)) {
      for (let i = 0; i < allowedOrigin.length; i++) {
        if (isOriginAllowed(origin, allowedOrigin[i])) {
          return true;
        }
      }
      return false;
    } else if (_.isString(allowedOrigin)) {
      return origin === allowedOrigin;
    } else if (allowedOrigin instanceof RegExp) {
      return allowedOrigin.test(origin);
    } else {
      return !!allowedOrigin;
    }
  }

  const ALLOW_ORIGIN = [ // 域名白名单
    'http://192.168.2.251:8080',
    'http://192.168.2.251:8000',
    'http://192.168.2.250:8080',
    'http://192.168.2.250:8000',
    'http://localhost:8080',
    'http://localhost:8000',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8000',
  ];

  router.all('*', function (req, res, next) {
    let reqOrigin = req.headers.origin; // request响应头的origin属性
    // 判断请求是否在域名白名单内
    if (isOriginAllowed(reqOrigin, ALLOW_ORIGIN)) {
      // 设置CORS为请求的Origin值
      res.header("Access-Control-Allow-Origin", reqOrigin);
      res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept,X-Requested-With");
      res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("X-Powered-By", ' 3.2.1');
      /*if (req.method == "OPTIONS") res.sendStatus(204);// 让options请求快速返回
      else next();*/
    } else {
      res.send({code: -2, msg: '非法请求'});
    }
    next()
  });

//定义返回格式
  let userInfo;
  router.use(function (req, res, next) {
    userInfo = {
      user: [],
      pwd: [],
      admin: [],
      userID: [],
      IDNo: [],
      MoNo: [],
      userType: []
    };
    next();
  });
}

//删除数组中指定元素  方法
{
  function removeChildren(arr, id) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      //console.log(arr[i].id);
      if (arr[i].id != id) {
        result.push(arr[i]);
      }
    }
    return result;
  }

  function removeNode(arr, id) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      //console.log(arr[i].id);
      if (arr[i].id != id) {
        result.push(arr[i]);
      }
    }
    return result;
  }
}

/* 获取目录tree */
router.post('/labelTree', function (req, res) {
  if (req.body.data) {
    let reqBody = req.body.data;
    res.setHeader("Content-Type", "application/json");

    if (reqBody.userType == 'admin') {
      fs.readFile("../app/mock/CMSlabelTree.json", 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          let labelTree = JSON.parse(data);
          //console.log(labelTree);
          res.status(200).send({
            result: labelTree
          });
        }
      });
    } else if (reqBody.userType == 'E') {
      //console.log('E');
      fs.readFile("../app/mock/CMSlabelTree.json", 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          let labelTree = JSON.parse(data);
          let childrenE = labelTree[0].children;
          children = removeChildren(childrenE, 102);  //传入要删除的Children id
          labelTree[0].children = children;
          //console.log(labelTree);
          res.status(200).send({
            result: labelTree
          });
        }
      });
    } else if (reqBody.userType == 'T') {
      //console.log('T');
      fs.readFile("../app/mock/CMSlabelTree.json", 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          let labelTree = JSON.parse(data);
          let childrenE = labelTree[0].children;
          children = removeChildren(childrenE, 103);  //传入要删除的Children id
          labelTree[0].children = children;
          //console.log(labelTree);
          res.status(200).send({
            result: labelTree
          });
        }
      });
    } else if (reqBody.userType == 'S' || reqBody.userType == 'O') {
      //console.log('O');
      fs.readFile("../app/mock/CMSlabelTree.json", 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          let labelTree = JSON.parse(data);
          childrenSS = removeNode(labelTree, 100);  //传入要删除的Node id
          labelTree = removeNode(childrenSS, 300);  //传入要删除的Node id
          console.log(labelTree);
          res.status(200).send({
            result: labelTree
          });
        }
      });
    } else {
      res.status(404).send({
        Msg: '输入权限错误',
        success: 1,
      });
    }
  } else {
    res.status(404).send({
      Msg: '权限数据为null',
      success: 1,
    });
  }
});

/* 获取用户管理数据 */
{
  router.post('/userManager', findUser, function (req, res) {
    User.find().then(function (users) {
      res.status(200).send({
        userInfo: users
      });
    });
  });

  function findUser(req, res, next) {
    //console.log(req.body.data);
    if (req.body.data.username) {
      let username = req.body.data.username;
      User.findOne({
        user: username,
      }).then(function (userType) {
        //console.log(userType.userType);
        if (userType.userType == 'admin') {

        } else {
          res.status(200).send({
            Msg: '找不到此用户',
            success: 1,
          });
        }
      });
    } else {
      res.status(404).send({
        Msg: '未获取到用户名',
        success: 1,
      });
    }
    next();
  }
}

/*删除所选用户*/
router.post('/delChecked', function (req, res) {
  //console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    if (reqData.userType == 'admin') {
      if (reqData.msg.length == 1) {
        User.remove({userID: reqData.msg.userID}, function (err) {
          if (err) {
            return res.json({err: err});
          } else {
            return res.json({msg: 'success'});
          }
        })
      } else {
        for (let i = 0; i < reqData.msg.length; i++) {
          User.remove({userID: reqData.msg[i].userID}, function (err) {
            if (err) {
              return res.json({err: err});
            } else {
              console.log('删除成功')
            }
          })
        }
      }
      res.status(200).send({
        Msg: '删除数据成功',
        success: 0,
      });
    }
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});

//添加用户
router.post('/addUser', function (req, res) {
  if (req.body.data) {
    let reqData = req.body.data;
    console.log(reqData);
    let reqUser = reqData.addUser;
    console.log(reqUser.name);
    if (reqData.userType == 'admin') {
      console.log('11');

      let addUserData = new User({
        user: reqUser.name,
        pwd: reqUser.pwd,
        userID: reqUser.userID,
        IDNo: reqUser.IDNo,
        MoNo: reqUser.MoNo,
        userType: reqUser.userType,
        gender: reqUser.gender,
        AdmDate: reqUser.AdmDate,
        major: reqUser.major,
        classGrade: reqUser.classGrade
      });
      addUserData.save(function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Save success');
        }
      });
    }else {
      res.status(404).send({
        Msg: '用户无添加权限',
        success: 0,
      });
    }
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});


module.exports = router;
