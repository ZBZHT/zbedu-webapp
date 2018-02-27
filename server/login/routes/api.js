const express = require('express');
const router = express.Router();
const User = require('../app/models/User');
const Session = require('../app/models/Session');

//定义返回格式
let userInfo;
router.use(function (req, res, next) {
  userInfo = {
    code: '',//0:登录成功  1:已登录  2:用户名或密码错误 3:退出成功 4:未登录
  };
  next();
});

//设置跨域请求
router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://192.168.2.251:8080");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", ' 3.2.1');
  if (req.method == "OPTIONS") res.sendStatus(204);/*让options请求快速返回*/
  else next();
});

//login处理
router.post('/user/login', checkLogin, function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  let userID = /^\d{8}$/;  //只能是8为数字
  let MoNo = /^[1][3,4,5,7,8][0-9]{9}$/;  //是否为11位有效手机号码
  let IDNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  //// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  let user = /^[\u4E00-\u9FA5]{2,4}$/; //用户名正则，2-4个汉字

  //判断是否是学号
  if (userID.test(username)) {
    //console.log('true');
    User.findOne({
      userID: username,
      pwd: password
    }).then(function (user) {
      if (!user) {
        console.log('用户名或密码错误,code : 2');
        userInfo.code = 2;
        res.end(JSON.stringify(userInfo));
      } else {
        //返回用户名和ID
        console.log('登录成功');
        userInfo = {
          code: 0,
          userID: user.userID,
          username: user.user,
          userType: user.userType
        };
        req.session.users = userInfo;
        //sessDada = sess.responseData;
        res.end(JSON.stringify(req.session.users));
      }
    });

    //判断是否是手机号
  } else if (MoNo.test(username)) {
    User.findOne({
      MoNo: username,
      pwd: password
    }).then(function (user) {
      if (!user) {
        console.log('用户名或密码错误,code : 2');
        userInfo.code = 2;
        res.end(JSON.stringify(userInfo));
      } else {
        //返回用户名和ID
        console.log('登录成功');
        userInfo = {
          code: 0,
          userID: user.userID,
          username: user.user,
          userType: user.userType
        };
        req.session.users = userInfo;
        //sessDada = sess.responseData;
        res.end(JSON.stringify(req.session.users));
      }
    });

    //判断是否是身份证号
  } else if (IDNo.test(username)) {
    User.findOne({
      IDNo: username,
      pwd: password
    }).then(function (user) {
      if (!user) {
        console.log('用户名或密码错误,code : 2');
        userInfo.code = 2;
        res.end(JSON.stringify(userInfo));
      } else {
        //返回用户名和ID
        console.log('登录成功');
        userInfo = {
          code: 0,
          userID: user.userID,
          username: user.user,
          userType: user.userType
        };
        req.session.users = userInfo;
        //sessDada = sess.responseData;
        res.end(JSON.stringify(req.session.users));
      }
    });

    //判断是否是身用户名
  } else if (user.test(username)) {
    User.findOne({
      user: username,
      pwd: password
    }).then(function (user) {
      if (!user) {
        console.log('用户名或密码错误,code : 2');
        userInfo.code = 2;
        res.end(JSON.stringify(userInfo));
      } else {
        //返回用户名和ID
        console.log('登录成功');
        userInfo = {
          code: 0,
          userID: user.userID,
          username: user.user,
          userType: user.userType
        };
        req.session.users = userInfo;
        //sessDada = sess.responseData;
        res.end(JSON.stringify(req.session.users));
      }
    });
  } else {
    console.log('用户名或密码错误,code : 2');
    userInfo.code = 2;
    res.end(JSON.stringify(userInfo));
  }
});

//判断是否是已登录状态
function checkLogin(req, res, next) {
  let sessID = req.sessionID;
  //查询数据库中用户名是否存在,存在则登录
  console.log(req.session.cookie);
  Session.findOne({
    _id: sessID,
  }).then(function (sessID) {
    //_id存在则更新此id
    if (sessID) {
      //console.log(JSON.parse(sessID.session));
      let users = JSON.parse(sessID._doc.session).users;

      console.log(users.code);
      users.code = 1;
      console.log('已登录');
      res.end(JSON.stringify(users));
    } else {
      next()
    }
  });
}

// 退出
router.post('/user/logout', function (req, res) {
  let ID = req.sessionID;
  let conditions = {_id: ID};
  Session.remove(conditions, function (error) {
    if (error) {
      console.error(error);
    } else {
      console.log("退出成功");
      userInfo.code = 3; //退出成功
      res.end(JSON.stringify(userInfo));
    }
  });
});

module.exports = router;
