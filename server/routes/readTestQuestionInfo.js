const express = require('express');
const router = express.Router();
const TestQuestionInfo = require('../app/models/TestQuestionInfo');
const TestQuestion = require('../app/models/TestQuestion');

//学生开始考试 ,  获取考试答案信息
router.get('/getTestQuesInfo', function (req, res) {
  let reqQ = req.query;
  //console.log(req.query);

  TestQuestionInfo.findOne({
    user: reqQ.user,
    state: 1,
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
  console.log(reqTestQuestion);
  //console.log(QuestionInfo.currTestType);

  TestQuestionInfo.findOneAndUpdate({
      testQuestion: reqTestQuestion
    }, {
      user: QuestionInfo.user,
      startTime: QuestionInfo.startTime,
      currAnswer: QuestionInfo.currAnswer,
      currState: QuestionInfo.currState,
      currIsId: QuestionInfo.currIsId,
      error: QuestionInfo.error,
      sorce: QuestionInfo.sorce,
      testTimeMinutes: QuestionInfo.testTimeMinutes,
      testTimeSeconds: QuestionInfo.testTimeSeconds,
      isCheckNum: QuestionInfo.isCheckNum
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

// 提交
router.get('/submitQuestionInfo', function (req, res) {
  let reqQ = req.query;
  let reqTestQuestion = reqQ.testQuestion;
  //console.log(reqTestQuestion);
  TestQuestion.findOneAndUpdate({
      currTestNum: reqTestQuestion
    }, {
      state: 2,
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        TestQuestionInfo.findOneAndUpdate({
            testQuestion: reqTestQuestion
          }, {
            user: reqQ.user,
            state: 2,
            startTime: reqQ.startTime,
            currAnswer: reqQ.currAnswer,
            currState: reqQ.currState,
            error: reqQ.error,
            sorce: reqQ.sorce,
            testTimeMinutes: reqQ.testTimeMinutes,
            testTimeSeconds: reqQ.testTimeSeconds,
            isCheckNum: reqQ.isCheckNum
          }, //{upsert: true},
          function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('提交成功');
              res.end(JSON.stringify({code: 0}));
            }
          });
      }
    });
});

//提交考试答案
router.get('/submitQuestion', function (req, res) {
  let reqQ = req.query;
  let reqTestQuestion = reqQ.testQuestion;
  let code = '';
  console.log('11');
  console.log(reqQ.startTime);
  TestQuestion.findOneAndUpdate({
      currTestNum: reqTestQuestion
    }, {
      state: 2,
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        TestQuestionInfo.findOneAndUpdate({
            testQuestion: reqTestQuestion
          }, {
            user: reqQ.user,
            currTestId: reqQ.currTestId,
            startTime: reqQ.startTime,
            state: 2,
            currAnswer: reqQ.currAnswer,
            currState: reqQ.currState,
            error: reqQ.error,
            sorce: reqQ.sorce,
            startTimeHours: reqQ.startTimeHours,
            startTimeMinutes: reqQ.startTimeMinutes,
            startTimeSeconds: reqQ.startTimeSeconds,
            testTimeMinutes: reqQ.testTimeMinutes,
            testTimeSeconds: reqQ.testTimeSeconds,
            isCheckNum: reqQ.isCheckNum
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
        console.log('更新答案成功');
        code = 0;
        res.end(JSON.stringify(code));
      }
    });

});

//查询所有答案
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

//学生开始考试 ,  获取考试答案信息getTestExercise
router.get('/getTestExerciseInfo', function (req, res) {
  let reqQ = req.query;
  //console.log(req.query);

  TestQuestionInfo.findOne({
    user: reqQ.user,
    state: 1,
    currTestType: 106,
  }).then(function (msg) {
    console.log('请求答案成功');
    //console.log(msg);
    result = msg;
    res.end(JSON.stringify(result));
  });
});




module.exports = router;
