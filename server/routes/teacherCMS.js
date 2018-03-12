const express = require('express');
const router = express.Router();
const _ = require('lodash');
const User = require('../app/models/User');

//设置跨域请求
// 判断origin是否在域名白名单列表中
function isOriginAllowed(origin, allowedOrigin) {
  if (_.isArray(allowedOrigin)) {
    for(let i = 0; i < allowedOrigin.length; i++) {
      if(isOriginAllowed(origin, allowedOrigin[i])) {
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
  let reqOrigin =req.headers.origin ; // request响应头的origin属性
  // 判断请求是否在域名白名单内
  if(isOriginAllowed(reqOrigin, ALLOW_ORIGIN)) {
    // 设置CORS为请求的Origin值
    res.header("Access-Control-Allow-Origin", reqOrigin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1');
    /*if (req.method == "OPTIONS") res.sendStatus(204);// 让options请求快速返回
    else next();*/
  } else {
    res.send({ code: -2, msg: '非法请求' });
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

/* GET home page. */
router.get('/userManager',findUser, function(req, res) {
  User.find().then(function (users) {
    res.status(200).send({
      userInfo : users
    });
  });
});

function findUser(req, res, next) {
  if (req.query.username) {
    let username = req.query.username;
    User.findOne({
      user: username,
    }).then(function (userType) {
      console.log(userType.userType);
      if (userType.userType == 'T') {

      } else {
        res.status(200).send({
          Msg : '找不到此用户',
          success : 1,
        });
      }
    });
  } else {
    res.status(404).send({
      Msg : '未获取到用户名',
      success : 1,
    });
  }
  next();
}
//分类修改
/*router.get('/User/edit',function (req, res) {
    console.log(req.query.id);
    var id = req.query.id || '';
    User.findOne({
        id: id
    }).then(function (users) {
        if (!users) {
            alert("分类信息不存在");
        } else {
            users: users
        }
    });
});*/


module.exports = router;
