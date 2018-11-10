const express = require('express');
const router = express.Router();
const Students = require('../app/models/Student');
const Teacher = require('../app/models/Teacher');
const Session = require('../app/models/Session');
const Ip = require('../app/models/Ip');
const _ = require('lodash');

//定义返回格式
let userInfo;
router.use(function (req, res, next) {
  userInfo = {
    code: '',//0:登录成功  1:已登录  2:用户名或密码错误 3:退出成功 4:未登录
  };
  next();
});

//login处理
router.post('/user/login', checkLogin, function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username);

  let userID = /^\d{8}$/;  //只能是8为数字
  let MoNo = /^[1][3,4,5,7,8][0-9]{9}$/;  //是否为11位有效手机号码
  let IDNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  //// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  let user = /^[\u4E00-\u9FA5]{2,4}$/; //用户名正则，2-4个汉字

  //判断是否是学号
  if (userID.test(username)) {
    //console.log('true');
    Students.findOne({
      userID: username,
      pwd: password
    }).then(function (student) {
      if (!student) {
        //教师登录
        Teacher.findOne({
          userID: username,
          pwd: password
        }).then(function (teacher) {
          //console.log(teacher);
          if (!teacher) {
            console.log('用户名或密码错误,code : 2');
            userInfo.code = 2;
            res.end(JSON.stringify(userInfo));
          } else {
            //返回用户名和ID
            console.log('登录成功');
            userInfo = {
              code: 0,
              userID: teacher.userID,
              username: teacher.user,
              userType: teacher.userType
            };
          }
        });
      } else {
        //返回用户名和ID
        console.log('登录成功');
        userInfo = {
          code: 0,
          userID: student.userID,
          username: student.user,
          userType: student.userType
        };
        req.session.users = userInfo;
        //sessDada = sess.responseData;
        res.end(JSON.stringify(req.session.users));
      }
    });

    //判断是否是手机号
  } else if (MoNo.test(username)) {
    //学生登录
    Students.findOne({
      MoNo: username,
      pwd: password
    }).then(function (student) {
      if (!student) {
        //教师登录
        Teacher.findOne({
          MoNo: username,
          pwd: password
        }).then(function (teacher) {
          //console.log(teacher);
          if (!teacher) {
            console.log('用户名或密码错误,code : 2');
            userInfo.code = 2;
            res.end(JSON.stringify(userInfo));
          } else {
            //返回用户名和ID
            console.log('登录成功');
            userInfo = {
              code: 0,
              userID: teacher.userID,
              username: teacher.user,
              userType: teacher.userType
            };
          }
        });
      } else {
        //返回用户名和ID
        console.log('登录成功');
        userInfo = {
          code: 0,
          userID: student.userID,
          username: student.user,
          userType: student.userType
        };
        req.session.users = userInfo;
        //sessDada = sess.responseData;
        res.end(JSON.stringify(req.session.users));
      }
    });

    //判断是否是身份证号
  } else if (IDNo.test(username)) {
    Students.findOne({
      IDNo: username,
      pwd: password
    }).then(function (student) {
      //console.log(student);
      if (!student) {
        //教师登录
        console.log(username);
        console.log(password);
        Teacher.findOne({
          IDNo: username,
          pwd: password
        }).then(function (teacher) {
          console.log(teacher);
          if (!teacher) {
            console.log('用户名或密码错误,code : 2');
            userInfo.code = 2;
            res.end(JSON.stringify(userInfo));
          } else {
            //返回教师和ID
            console.log('登录成功');
            userInfo = {
              code: 0,
              userID: teacher.userID,
              username: teacher.user,
              userType: teacher.userType
            };
            req.session.users = userInfo;
            res.end(JSON.stringify(req.session.users));
          }
        });
      } else {
        //返回用户名和ID
        console.log('登录成功');
        userInfo = {
          code: 0,
          userID: student.userID,
          username: student.user,
          userType: student.userType
        };
        req.session.users = userInfo;
        //sessDada = sess.responseData;
        res.end(JSON.stringify(req.session.users));
      }
    });

    //判断是否是用户名
  } else if (user.test(username)) {
    Students.findOne({
      user: username,
      pwd: password
    }).then(function (student) {
      if (!student) {
        //教师登录
        Teacher.findOne({
          user: username,
          pwd: password
        }).then(function (teacher) {
          //console.log(teacher);
          if (!teacher) {
            console.log('用户名或密码错误,code : 2');
            userInfo.code = 2;
            res.end(JSON.stringify(userInfo));
          } else {
            //返回教师和ID
            console.log('登录成功');
            userInfo = {
              code: 0,
              userID: teacher.userID,
              username: teacher.user,
              userType: teacher.userType
            };
            req.session.users = userInfo;
            //console.log(userInfo);
            res.end(JSON.stringify(req.session.users));
          }
        });
      } else {
        //返回学生和ID
        console.log('登录成功');
        userInfo = {
          code: 0,
          userID: student.userID,
          username: student.user,
          userType: student.userType
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

//跳转判断登录状态
router.post('/user/loginState', function (req, res) {
  let sessID = req.sessionID;
  console.log(sessID);
  let code = '';
  //查询数据库中用户名是否存在,存在则登录
  Session.findOne({
    _id: sessID,
  }).then(function (sesID) {
    //_id存在则更新此id
    if (sesID) {
      code = 1;
      console.log('已登录');
      res.end(JSON.stringify(code));
    } else {
      code = 4;
      console.log('未登录');
      res.end(JSON.stringify(code));
    }
  });
});

//判断是否是已登录状态
function checkLogin(req, res, next) {
  let sessID = req.sessionID;
  //查询数据库中用户名是否存在,存在则登录
  Session.findOne({
    _id: sessID,
  }).then(function (sesID) {
    //_id存在则更新此id
    if (sesID) {
      let users = JSON.parse(sesID._doc.session).users;
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
  //console.log('11');
  //console.log(ID);
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

//获取服务器ip
router.get('/user/getServerIP', function (req, res) {
  Ip.findOne({
  }).then(function (result) {
    console.log(result);
    if (result === null) {
      res.status(200).send({Msg: '数据库存储的ip为空', code: 1,});
    } else {
      res.status(200).send({Msg: '获取ip成功', code: 0, serverIP: result});
    }
  })
});


module.exports = router;
