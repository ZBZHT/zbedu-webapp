const express = require('express');
const router = express.Router();
const TestQuestion = require('../app/models/TestQuestion');
const TestQuestionInfo = require('../app/models/TestQuestionInfo');
const TeachNewTestQ = require('../app/models/TeachNewTestQ');
const Question = require('../app/models/Question');
const Student = require('../app/models/Student');
const Teacher = require('../app/models/Teacher');
const core = require('../utils/core');
const Async = require('async');

//定义返回格式
let testResult;
router.use(function (req, res, next) {
  testResult = {
    question: [],
    testLength: '',
    testQuestion: 0,
    resId : 0
  };
  next();
});

//教师,待考试请求
router.get('/toTestData', function (req, res) {
  let reqUser = req.query.user;
  TeachNewTestQ.find({
    user: reqUser,
    state: 0,
  }).then(function (result) {
    //console.log(result);
    res.end(JSON.stringify(result));
  });
});

//教师,删除创建的考试
router.get('/dellNewTestQ', function (req, res) {
  let reqId = req.query.id;
  TeachNewTestQ.remove({id: reqId}, function (err) {
    if (err) {
      return res.status(404).send({err: err,});
    } else {
      console.log('删除数据成功');
      res.end(JSON.stringify({code : 0 }));
    }
  })
});

//教师,历史考试请求
router.get('/historyTestData', function (req, res) {
  let reqUser = req.query.user;
  TeachNewTestQ.find({
    user: reqUser,
    state: 2,
  }).then(function (result) {
    //console.log(result);
    res.end(JSON.stringify(result));
  });
});

//教师,成绩管理请求
router.get('/checkGradesData', function (req, res) {
  TestQuestionInfo.find({
    state: 2,
  }).then(function (result) {
    //console.log(result);
    res.end(JSON.stringify(result));
  });
});

/*
* 学生
* */
//学生,开始考试后, 改变考试状态
router.get('/clickStartTest', function (req, res) {
  let reqQ = req.query;
  TestQuestionInfo.findOneAndUpdate({  //改变考试答案状态为1
      user: reqQ.user,
      currTestNum: reqQ.currTestNum,
    }, {
      state: 1,
      startTestTime: reqQ.startTestTime,
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        res.end(JSON.stringify({code: 0}));
      }
    });
});

//学生,获取正在考试的题
router.get('/getTestQing', function (req, res) {
  //console.log(reqUser);
  TestQuestionInfo.findOne({
    user: req.query.user,
    state: 1,
  }).then(function (msgOne) {
    //console.log(msgOne);
    if (msgOne && msgOne.currTestType != 106) {
      res.end(JSON.stringify(msgOne));
    } else {
      res.end(JSON.stringify({code: 1}));
    }
  })
});

//学生,历史考试请求
router.get('/stuHistoryTestData', function (req, res) {
  let reqUser = req.query.user;
  TestQuestionInfo.find({
    user: reqUser,
    state: 2,
  }).sort({currTestNum:-1}).then(function (testQuestionInfo) {
    if (testQuestionInfo) {
      /*Async.forEachOf(testQuestionInfo, function (value1, i, callback) {
        Async.forEachOf(testQuestionInfo[i].question, function (value2, j, callback) {
        setTimeout() Question.find({
            num: { "$in": testQuestionInfo[i].question[j] }
          }).then(function (question) {
            return testQuestionInfo[i].question[j] = question;
          }).then(function (result) {
           return testResult.question.push(testQuestionInfo[i].question);
          });
        }, function (err) {
          if (err) console.error(err.message);
          console.log(rr);
        });
          callback();
      }, function (err) {
        if (err) console.error(err.message);
        //doSomethingWith(configs);
      });*/

      testQuestionInfo.forEach((element, i, Info) => {
          Info[i].question.forEach((element, j, arr) =>{
            Question.find({
              num: { "$in": arr[j] }
            }).then(function (question) {
              arr[j] = question;
            }).then(function () {
              testResult.question.push(arr);
              //console.log(testResult.question);
              console.log('11');
            });
          });
        });

      testQuestionInfo.forEach((element, i, Info) => {
          Info[i].question.forEach((element, j, arr) =>{
            Question.find({
              num: { "$in": arr[j] }
            }).then(function (question) {
              arr[j] = question;
            }).then(function () {
              testResult.question.push(arr);
              //console.log(testResult.question);
              console.log('11');
            });
          });
        });
      }
  }).then(function () {
    res.end(JSON.stringify({
      //testQuestionInfo: testQuestionInfo
    }));
  });
  console.log(testResult.question);
});

//学生,创建练习
router.get('/stuNewExercise', function (req, res) {
  let reqQ = req.query;
  //console.log(reqQ);
  Question.find(
  ).then(function (question) {
    let testItems = core.getArrayItems(question, reqQ.num);
    for (let i=0; i<=testItems.length-1; i++) {
      testItems.push(testItems[i].num)
    }
    TestQuestionInfo.find({
    }).sort({currTestNum:-1}).then(function (testQ) {
      if (testQ.length <= 0) {
        testResult.testLength = 0;
      } else {
        testResult.testLength = testQ[0].currTestNum;
      }
        testResult.testLength = Number(testResult.testLength) + 1;

        //创建学生试题
      let testQuestionInfo = new TestQuestionInfo({
        user: reqQ.user,
        currTestType : reqQ.currTestType,
        currTestNum: testResult.testLength,
        theme: reqQ.theme,
        msg: "error parameter",
        testId: 1,
        state: 0,
        status: 0,
        title: '',
        desc: "biansuqi test",
        startTime: '',
        currAnswer: '',
        currState: '',
        currIsId: [],
        error: '',
        sorce: 2,
        startTimeHours: 0,
        startTimeMinutes: 0,
        startTimeSeconds: 0,
        testTimeMinutes: 0,
        testTimeSeconds: 0,
        isCheckNum: 0,
        date1: reqQ.date1,
        date2: reqQ.date2,
        date3: reqQ.date3,
        date4: reqQ.date4,
        timeHour: reqQ.timeHour,
        timeMin: reqQ.timeMin,
        allScore: reqQ.allScore,
      });
      testQuestionInfo.question = testResult.testItemsNum;
      testQuestionInfo.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Success!');
          res.end(JSON.stringify({code: 0,msg: '练习创建成功'}));
        }
      });
    });
  });
});

//学生,获取练习题和答案
router.get('/getTestExercise', function (req, res) {
  //console.log(reqUser);
  let reqUser = req.query.user;
  TestQuestionInfo.findOne({
    user: reqUser,
    state: 1,
    currTestType: 106,
  }).then(function (info) {
    if (info) {
      res.end(JSON.stringify({
        testQuestion: info,
      }));
    } else {
      res.status(404).send({err: err,});
    }
  })
});

//学生,历史练习
router.get('/stuHistoryPractice', function (req, res) {
  let reqUser = req.query.user;
  //console.log(reqUser);
  TestQuestionInfo.find({
    user: reqUser,
    state: 2,
    currTestType: 106,
  }).sort({testQuestion:-1}).then(function (testQuestionInfo) {
    if (testQuestionInfo) {
      res.end(JSON.stringify({
        testQuestionInfo: testQuestionInfo
      }));
    } else {
      res.status(404).send({err: err,});
    }
  })
});

//学生,获取课后作业
router.get('/getHomeWork', function (req, res) {
  let reqQ = req.query;
  let reqQc = reqQ.checkArr;
  let resQues = [];
  //console.log(reqQc);
  if (reqQc.length >= 1) {
    Question.find({
      major: { "$in": reqQc }
    }).then(function (question) {
      if (question !== []) {
        for (let i=0; i<=question.length-1; i++) {
          if (reqQc[reqQc.length-1] === question[i].title1) {
            resQues.push(question[i]);
          }
          if (reqQc[reqQc.length-1] === question[i].title2) {
            resQues.push(question[i]);
          }
          if (reqQc[reqQc.length-1] === question[i].title3) {
            resQues.push(question[i]);
          }
          if (reqQc[reqQc.length-1] === question[i].title4) {
            resQues.push(question[i]);
          }
        }
        //console.log(resQues);
        res.end(JSON.stringify({ result: resQues }));
      }
    })
  }

});

module.exports = router;
