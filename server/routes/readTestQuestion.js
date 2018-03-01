const express = require('express');
const router = express.Router();
const TestQuestion = require('../app/models/TestQuestion');

//设置跨域请求
router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
    /让options请求快速返回/
  } else {next();}
});

//添加新comment
/*router.get('/addComment', function (req, res) {
  let reqComment = req.query;
  let testQuestion = new TestQuestion({
    status: '0',
    msg: "comments data a success"
  });
  testQuestion.result.push({
    type: "1",
    Id: "1",
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
});*/
//定义返回格式
let testResult;
router.use(function (req, res, next) {
  testResult = {
    testLength: '',
    testQuestion: ''
  };
  next();
});
//刷新查询整个文档
router.get('/all', function (req, res) {
  let reqCurrTestNum = req.query.currTestNum;
  let reqUser = req.query.user;
  //console.log(reqUser);
console.log(reqCurrTestNum);
    TestQuestion.findOne({
      currTestNum: reqCurrTestNum
    }).then(function (msgOne) {

      TestQuestion.find({
        user: reqUser
      }).then(function (msg) {
        //console.log(msg);
        testResult.testLength = msg.length;
        testResult.testQuestion = msgOne;
        //console.log(testResult);
        res.end(JSON.stringify(testResult));
      });
    });
});

//点击查询整个文档
router.get('/clickQuery', function (req, res) {
  let reqCurrTestNum = req.query.currTestNum;
  let reqstate = req.query.state;
  //console.log(reqstate);
  TestQuestion.findOneAndUpdate({
    currTestNum: reqCurrTestNum
  }, {
    state: reqstate
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      TestQuestion.findOne({
        currTestNum: reqCurrTestNum
      }).then(function (msg) {
        //console.log(msg);
        result = msg;
        res.end(JSON.stringify(result));
      });
    }
  });
});

//提交答案QuestionInfo
router.get('/submitQuestionInfo', function (req, res) {
  let reqtestQuestion = req.query.testQuestion;
  let reqstate = req.query.state;
  let code = '';
  //console.log(reqstate);
  TestQuestion.findOneAndUpdate({
    currTestNum: reqtestQuestion
  }, {
    state: reqstate
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('提交成功2');
      code = 0;
      res.end(JSON.stringify(code));
    }
  });
});

module.exports = router;
