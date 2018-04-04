const express = require('express');
const router = express.Router();
const Comments = require('../app/models/Comments');

//设置跨域请求
/*router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
    /让options请求快速返回/
  }
  else {
    next();
  }
});*/

//添加新comment
router.get('/addComment', function (req, res) {
  //let reqComment = req.query;
  let comments = new Comments({
    status: '0',
    msg: "comments data a success"
  });
  comments.result.push({
    type: "1",
    num: "1",
    source: "course",
    title: "动力电池系统故障检修",
    user: "橘子1",
    text: "不错，微课拍的很专业，也很详细",
    time: "2017-12-12 10:20:36",
    score: "2",
    target: "",
    targetId: ""
  });
  comments.save(function (err) {
    if (err) return handleError(err);
    console.log('Success!');
  });
});

//查询整个文档
router.get('/all', function (req, res) {
  let result = '';
  Comments.findOne({
    status: '0'
  }).then(function (user) {
    result = user;
    res.end(JSON.stringify(result));
  });
});

//更新result
router.get('/update', function (req, res) {
  let reqComment = req.query;
  let code = '';
  console.log(reqComment);
  Comments.update({status: "0"}, {
      $push: {
        result: {
          type: reqComment.type,
          num: reqComment.num,
          source: reqComment.source,
          title: reqComment.title,
          user: reqComment.user,
          text: reqComment.text,
          time: reqComment.time,
          score: reqComment.score,
          target: reqComment.target,
          targetId: reqComment.targetId
        }
      }
    }, {upsert: true},
    function (err) {
      if (err) {
        console.log(err);
      } else {
        code = 0;
        res.end(JSON.stringify(code));
      }
    });
});

module.exports = router;
