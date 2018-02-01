var express = require('express');
var router = express.Router();
var User = require('../app/models/User');


/* GET home page. */
router.get('/', function(req, res) {
    /*if (!req.userInfo.isAdmin) {
        res.send('对不起,只有管理员才可以登录后台管理')
    }
    */
    User.find().then(function (users) {
        res.render('bms', {
            //设置模板
            //userInfo: req.userInfo,
            users: users
        });
    });
});

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

//分类删除



module.exports = router;
