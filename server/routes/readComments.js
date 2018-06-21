const express = require('express');
const router = express.Router();
const Comment = require('../app/models/Comment');

//获取对应的comment
router.get('/getComment', function (req, res) {
  let reqTit = req.query.title;
  let username = req.session.users.username;
  //console.log(reqTit);
    if (username !== '') {
    findComment();
    function findComment() {
      Comment.findOne({
        title: reqTit
      }).then(function (user) {
        console.log(user);
        if (user === null) {
          //console.log('找不到');
          let comment = new Comment({
            title: reqTit,
            appraiseMsg: [],
          });
          comment.save(function (err) {
            if (err) console.log(err);
            console.log('Success!');
            Comment.findOne({
              title: reqTit
            }).then(function (user1) {
              res.status(200).send({ code: 1, result: user1 });
            })
          });
        } else {
          //res.end(JSON.stringify({ result: user }));
          console.log('读取成功');
          res.status(200).send({ code: 1, result: user });
        }
      });
    }
  } else {
    console.log('未登录');
    res.status(200).send({ code: 1, msg: '未登录'});
  }

});

//更新result
router.get('/updateComment', function (req, res) {
  let reqComment = JSON.parse(req.query.appraiseContent);
  Comment.findOneAndUpdate({
    title: reqComment.title
  }, {
    appraiseMsg: reqComment.appraiseMsg,
  }, function (err) {
    if (err) {
      console.log(err);
      res.status(200).send({ code: 1, Msg: '更新失败', });
    } else {
      console.log('更新成功');
      res.status(200).send({ code: 0, Msg: '更新成功', });
    }
  });
});

module.exports = router;
