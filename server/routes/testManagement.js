const express = require('express');
const router = express.Router();
const TestQuestionInfo = require('../app/models/TestQuestionInfo');
const TestQuestion = require('../app/models/TestQuestion');

//设置跨域请求
/*router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", ' 3.2.1');
  if (req.method == "OPTIONS") res.sendStatus(204);/!*让options请求快速返回*!/
  else next();
});*/

//定义返回格式
let testManageResult;
router.use(function (req, res, next) {
  testManageResult = {
    testQuestion: '',
    testQuestionInfo: ''
  };
  next();
});

/*//考试管理  查询用户全部考试题和答案
router.get('/testManagement', function (req, res) {
  let reqUser = req.query.user;
  console.log(reqUser);
  TestQuestion.find({
    user: reqUser
  }).then(function (TestQuestion) {
    console.log('请求考试题成功');
    TestQuestionInfo.find({
      user: reqUser
    }).then(function (TestQuestionInfo) {
      console.log('请求考试题成功');
      testManageResult.testQuestion = TestQuestion + TestQuestionInfo;
      console.log(testManageResult.testQuestion);
      //testManageResult.testQuestion = TestQuestionInfo;
      res.end(JSON.stringify(testManageResult));
    });
  });
});*/

//考试管理  查询用户全部考试题和答案
router.get('/testManagement', function (req, res) {
  let reqUser = req.query.user;
  console.log(reqUser);
  TestQuestion.find({
    user: reqUser
  }).then(function (TestQuestion) {
    console.log('请求考试题成功');

    TestQuestionInfo.find({
      user: reqUser
    }).then(function (TestQuestionInfo) {
      console.log('请求考试题成功');
      testManageResult.testQuestion = TestQuestion;
      testManageResult.testQuestionInfo = TestQuestionInfo;
      res.end(JSON.stringify(testManageResult));
    });
  });
});



module.exports = router;
