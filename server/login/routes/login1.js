const express = require('express');
const router = express.Router();
const User = require('../app/models/User');
const Session = require('../app/models/Session');

//定义返回格式
let message;
router.use(function (req, res, next) {
    message = '';
    next();
});
//如果登录了，是无法访问登录和注册页面的
function checkNotLogin(req, res, next) {
    if (req.session.user) {
        //console.log(req.sessionID);
        res.render('home1',{message: '已登录'});
    }else {
     next()
    }
}

/* GET home page. */
router.get('/', function(req, res) {
    let ID = req.sessionID;
    //console.log(req.sessionID);
    //查询数据库中用户名是否存在,存在则登录
    //console.log(req.cookies);
    Session.findOne({
        _id: ID,
    }).then(function (userID) {
        //console.log(JSON.parse(userID._doc.session).userID);
        //_id存在则更新此id
        if (userID) {
            //console.log(userID);
            res.render('home1',{message: '已登录'});
        }else {
            res.render('login1',{title: 'login1'});
        }
    });
});

//login处理
router.post('/', checkNotLogin, function (req, res) {
    res.setHeader("Content-Type","text/html;charset=UTF-8");
    let user = req.body.user;
    let pwd = req.body.pwd;
    console.log(req.url);
    //console.log(req.sessionID);  BzqBJSfDPiJH0KFc60jMrU7zTBvvWRzd
    //console.log(req.cookies);
    //查询数据库中用户名是否存在,存在则登录
    User.findOne({
        user: user,
        pwd: pwd
    }).then(function (userInfo) {
        if (!userInfo) {
            res.render('login1',{message: '用户名或密码错误'});
        }else {
            //处理cookie和session
            /*res.cookie('userID', userInfo._id,{
                path: '/',
                maxAge: 1000*60*60
            });*/
            //req.session.user = userInfo.user;
            req.session.user = userInfo.user;
            console.log(req.sessionID);
            //console.log(req.session);
            res.render('home1',{message: '登录成功'});
        }
    })
});

//处理logout
router.get('/logout1', function(req, res) {
    /*delete req.session.loadend;
    res.render('home1',{message: '退出成功'});
    eq.session.destroy(function(err) {
    req.session.loadend = false;
        res.render('home1',{message: '退出成功'});
    })*/
    let ID = req.sessionID;
    let conditions = {_id: ID};
    Session.remove(conditions, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log("用户删除成功");
            res.render('home1',{message: '退出成功'});
        }
    });
});

module.exports = router;
