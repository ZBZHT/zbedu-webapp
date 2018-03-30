const express = require('express');
const router = express.Router();
const TestQuestionInfo = require('../app/models/TestQuestionInfo');

//设置跨域请求
router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", ' 3.2.1');
  if (req.method == "OPTIONS") res.sendStatus(204);/*让options请求快速返回*/
  else next();
});

//查询整个答案文档
router.get('/all', function (req, res) {
  let reqQestQuestion = req.query.currTestNum;
  //console.log(req.query);

  TestQuestionInfo.findOne({
    testQuestion: reqQestQuestion
  }).then(function (msg) {
    console.log('请求答案成功');
    //console.log(msg);
    result = msg;
    res.end(JSON.stringify(result));
  });
});

//更新考试答案
router.get('/update', function (req, res) {
  let QuestionInfo = req.query;
  let reqTestQuestion = QuestionInfo.testQuestion;
  let code = '';
  console.log(QuestionInfo);
  console.log(QuestionInfo.currTestType);

  //console.log( (QuestionInfo.startTime));

  TestQuestionInfo.findOneAndUpdate({
      testQuestion: reqTestQuestion
    }, {
      state:QuestionInfo.state,
      user: QuestionInfo.user,
      currTestType: QuestionInfo.currTestType,
      startTime: QuestionInfo.startTime,
      currAnswer: QuestionInfo.currAnswer,
      currState: QuestionInfo.currState,
      error: QuestionInfo.error,
      sorce: QuestionInfo.sorce,
      startTimeHours:QuestionInfo.startTimeHours,
      startTimeMinutes:QuestionInfo.startTimeMinutes,
      startTimeSeconds:QuestionInfo.startTimeSeconds,
      testTimeMinutes:QuestionInfo.testTimeMinutes,
      testTimeSeconds:QuestionInfo.testTimeSeconds,
      isCheckNum:QuestionInfo.isCheckNum
    }, //{upsert: true},
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('更新答案成功');
        code = 0;
        res.end(JSON.stringify(code));
      }
    });
});

//提交考试答案
router.get('/submitQuestionInfo', function (req, res) {
  let QuestionInfo = req.query;
  let reqTestQuestion = QuestionInfo.testQuestion;
  let code = '';
  console.log('11');
  console.log(QuestionInfo.startTime);

  TestQuestionInfo.findOneAndUpdate({
      testQuestion: reqTestQuestion
    }, {
      user: QuestionInfo.user,
      currTestId: QuestionInfo.currTestId,
      startTime: QuestionInfo.startTime,
      state:QuestionInfo.state,
      currAnswer: QuestionInfo.currAnswer,
      currState: QuestionInfo.currState,
      error: QuestionInfo.error,
      sorce: QuestionInfo.sorce,
      startTimeHours:QuestionInfo.startTimeHours,
      startTimeMinutes:QuestionInfo.startTimeMinutes,
      startTimeSeconds:QuestionInfo.startTimeSeconds,
      testTimeMinutes:QuestionInfo.testTimeMinutes,
      testTimeSeconds:QuestionInfo.testTimeSeconds,
      isCheckNum:QuestionInfo.isCheckNum
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('更新答案成功');
        code = 0;
        res.end(JSON.stringify(code));
      }
    });
});

//查询整个答案文档
router.get('/testManagement', function (req, res) {
  let reqQestQuestion = req.query.currTestNum;
  let reqUser = req.query.user;
  //console.log(req.query);
  TestQuestionInfo.find({
    user: reqUser
  }).then(function (msg) {

    console.log('请求答案成功');
    //console.log(msg);
    result = msg;
    res.end(JSON.stringify(result));
  });

  TestQuestionInfo.findOne({
    testQuestion: reqQestQuestion
  }).then(function (msg) {

    console.log('请求答案成功');
    //console.log(msg);
    result = msg;
    res.end(JSON.stringify(result));
  });
});

//学生,待考试请求
router.get('/stuToTestData', function (req, res) {
  let reqUser = req.query.user;
  TeachNewTestQ.find({
    user: reqUser,
    state: 0,
  }).then(function (result) {
    //console.log(result);
    res.end(JSON.stringify(result));
  });
});

//学生,历史考试请求
router.get('/stuHistoryTestData', function (req, res) {
  let reqUser = req.query.user;
  TeachNewTestQ.find({
    user: reqUser,
    state: 2,
  }).then(function (result) {
    //console.log(result);
    res.end(JSON.stringify(result));
  });
});


module.exports = router;
