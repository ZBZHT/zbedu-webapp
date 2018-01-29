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
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By",' 3.2.1');
    if(req.method=="OPTIONS") res.sendStatus(204);/*让options请求快速返回*/
    else  next();
});

/*router.post('/', function (req, res) {
    if(req.session.userinfo) {
        //已经登录
        responseData.userInfo = {
            code: 1
        };
        //sessDada = req.session.responseData;
        //console.log(sessDada);
        //res.end(JSON.stringify(responseData));
        return res.end(JSON.stringify(responseData));

    } else {
        req.session.error='请先登陆';
        return res.redirect('/user/login');
    }
});*/

//login处理
router.post('/user/login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username || password) {
    //查询数据库中用户名是否存在,存在则登录
    User.findOne({
        user: username,
        pwd: password
    }).then(function (user) {

        if (!user) {
            console.log('用户名或密码错误,code : 2');
            userInfo.code = 2;
            res.end(JSON.stringify(userInfo));
        }
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
        /*})*/
    })
    }
});
//如果登录了，是无法访问登录和注册页面的
function checkNotLogin(req, res, next) {
    let sessID = req.sessionID;
    //查询数据库中用户名是否存在,存在则登录
    //console.log(req.cookies);
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
        }else {
            next()
        }
    });
}

// 退出
router.post('/user/logout',checkNotLogin, function (req, res) {
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