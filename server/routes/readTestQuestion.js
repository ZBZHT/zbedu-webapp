const express = require('express');
const router = express.Router();
const TestQuestion = require('../app/models/TestQuestion');
const TestQuestionInfo = require('../app/models/TestQuestionInfo');
const TeachNewTestQ = require('../app/models/TeachNewTestQ');
const Question = require('../app/models/Question');
const Student = require('../app/models/Student');
const Teacher = require('../app/models/Teacher');
const core = require('../utils/core');

//定义返回格式
let testResult;
router.use(function (req, res, next) {
  testResult = {
    testLength: '',
    testQuestion: 0,
    resId : 0
  };
  next();
});

/*
* 老师
* */
//老师创建考试
function addNewTestQuestion(req, res, next) {
  let reqQ = req.query;

  TeachNewTestQ.find().sort({id:-1}).then(function (result) {
    //console.log(result[0].user);

    if (result.length != 0) {
      testResult.resId = Number(result[0].id) + 1;
    } else {
      testResult.resId = 1;
    }
    //console.log(testResult.resId);
    let teachNewTestQ = new TeachNewTestQ({
      id : testResult.resId,
      user: reqQ.user,
      theme: reqQ.theme,
      name: reqQ.name,
      nameId: reqQ.nameId,
      currTestType: reqQ.currTestType,
      state: 0,
      date1: reqQ.date1,
      date2: reqQ.date2,
      date3: reqQ.date3,
      date4: reqQ.date4,
      num: reqQ.num,
      timeHour: reqQ.timeHour,
      timeMin: reqQ.timeMin,
      major: reqQ.major,
      classGrade: reqQ.classGrade,
      newData: reqQ.newData,
      allScore: reqQ.allScore,
    });
    teachNewTestQ.save(function (err) {
      if (err) {
        console.log(err);
        res.end(JSON.stringify({code : 1, Msg: '创建考试失败'}));
      } else {
        console.log('Success! teachNewTestQ');
        res.end(JSON.stringify({code : 0, Msg: '创建考试成功'}));
        next();
      }
    });
  });
}

//教师发题
function distTestQuestion(req, res, next) {
  let reqQ = req.query;
  //console.log(reqQ);
  Question.find(
  ).then(function (question) {
    let testItems = core.getArrayItems(question, reqQ.num);
    //testItems = JSON.stringify(testItems);
    Student.find({
      classGrade: reqQ.classGrade
    }).then(function (stu) {
      TestQuestion.find({
      }).sort({currTestNum:-1}).then(function (testQ) {
        if (testQ.length <= 0) {
          testResult.testLength = 0;
        } else {
          testResult.testLength = testQ[0].currTestNum;
        }
      for (let i=0; i<stu.length; i++) {
        testResult.testLength = Number(testResult.testLength) + 1;
        //console.log(testResult.testLength);
        //创建所有学生试题
        let testQuestion = new TestQuestion({
          user: stu[i].user,
          currTestType : reqQ.currTestType,
          currTestNum: testResult.testLength,
          theme: reqQ.theme,
          msg: "error parameter",
          testId: 1,
          state: 0,
          status: 0,
          title: '',
          desc: "biansuqi test",
          date1: reqQ.date1,
          date2: reqQ.date2,
          date3: reqQ.date3,
          date4: reqQ.date4,
          timeHour: reqQ.timeHour,
          timeMin: reqQ.timeMin,
          allScore: reqQ.allScore,
        });
        testQuestion.question = testItems;
        testQuestion.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Success!');
          }
        });
        //创建所有学生试题记录
        let testQuestionInfo = new TestQuestionInfo({
          user: stu[i].user,
          currTestType: reqQ.currTestType,
          testQuestion: testResult.testLength,
          theme: reqQ.theme,
          state: 0,
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
          isCheckNum: 0
        });
        testQuestionInfo.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Success!');
          }
        });
      }
      });
    });
  });
  next()
}

//提交答案QuestionInfo
router.get('/submitQuestionInfo', function (req, res) {
  let reqtestQuestion = req.query.testQuestion;
  let reqstate = req.query.state;
  let state = '';

  TestQuestion.findOneAndUpdate({
    currTestNum: reqtestQuestion
  }, {
    state: reqstate
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('提交成功2');
      state = 2;
      res.end(JSON.stringify(state));
    }
  });
});

//教师,创建考试
router.get('/addTestQuestion', addNewTestQuestion, distTestQuestion, function (req, res) {
  let reqQ = req.query;
  let reqUser = reqQ.user;
  TeachNewTestQ.find({
    user: reqUser
  }).then(function (result) {
    //console.log(result);
    res.end(JSON.stringify(result));
  });
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

//教师,历史考试请求
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
  //console.log(reqQ);

  TestQuestion.findOneAndUpdate({  //改变考试题状态为1
      user: reqQ.user,
      currTestNum: reqQ.currTestNum,
    }, {
      state: 1,
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        TestQuestionInfo.findOneAndUpdate({  //改变考试答案状态为1
            user: reqQ.user,
            testQuestion: reqQ.currTestNum,
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
      }
    });
});

//学生,开始考试 获取待考试题
router.get('/getTestQ', function (req, res) {
  if (req.query.currTestNum != '') {

    let reqCurrTestNum = req.query.currTestNum;
    let reqUser = req.query.user;
    //console.log(reqUser);
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
  } else {
    res.end(JSON.stringify({code : 1}));
  }
});

//学生,获取正在考试的题
router.get('/getTestQing', function (req, res) {
  //console.log(reqUser);
  TestQuestion.findOne({
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
  //console.log(reqUser);
  TestQuestion.find({
    user: reqUser,
    state: 2,
  }).sort({currTestNum:-1}).then(function (testQuestion) {
    if (testQuestion) {
      TestQuestionInfo.find({
        user: reqUser,
        state: 2,
      }).sort({testQuestion:-1}).then(function (testQuestionInfo) {
        if (testQuestionInfo) {
          res.end(JSON.stringify({
            testQuestion: testQuestion,
            testQuestionInfo: testQuestionInfo
          }));
        } else {
          res.status(404).send({err: err,});
        }
      });
    } else {
      res.status(404).send({err: err,});
    }
  });
});

//学生,待考试请求
router.get('/stuToTestData', function (req, res) {
  let reqUser = req.query.user;
  //console.log(reqUser);
  TestQuestion.find({
    user: reqUser,
    state: 0,
  }).then(function (result) {
    //console.log(result);
    res.end(JSON.stringify(result));
  });
});

//学生,创建练习
router.get('/stuNewExercise', function (req, res) {
  let reqQ = req.query;
  //console.log(reqQ);
  Question.find(
  ).then(function (question) {
    let testItems = core.getArrayItems(question, reqQ.num);
    TestQuestion.find({
    }).sort({currTestNum:-1}).then(function (testQ) {
      if (testQ.length <= 0) {
        testResult.testLength = 0;
      } else {
        testResult.testLength = testQ[0].currTestNum;
      }
        testResult.testLength = Number(testResult.testLength) + 1;

        //创建学生试题
        let testQuestion = new TestQuestion({
          user: reqQ.user,
          currTestType : 106,
          currTestNum: testResult.testLength,
          msg: "error parameter",
          testId: 1,
          state: 1,
          status: 0,
          title: reqQ.nameId,
          desc: "biansuqi test",
          date1: new Date(),
          timeHour: reqQ.timeHour,
          timeMin: reqQ.timeMin,

        });
        /*allScore: reqQ.allScore,*/
      testQuestion.question = testItems;

      testQuestion.save(function (err) {
        if (err) {
          res.status(404).send({err: err,});
          console.log(err);
        } else {
          console.log('Success!');
        }
        });

        //创建学生试题记录
        let testQuestionInfo = new TestQuestionInfo({
          user: reqQ.user,
          currTestType: 106,
          testQuestion: testResult.testLength,
          state: 1,
          startTime: new Date(),
          currAnswer: '',
          currState: '',
          error: '',
          sorce: 2,
          startTimeHours: 0,
          startTimeMinutes: 0,
          startTimeSeconds: 0,
          testTimeMinutes: 0,
          testTimeSeconds: 0,
          isCheckNum: 0,
          currIsId: [],
        });

        testQuestionInfo.save(function (err) {
          if (err) {
            res.status(404).send({err: err,});
            console.log(err);
          } else {
            console.log('Success!');
          }
        });
      res.end(JSON.stringify({code: 0}));
    });
  });
});

//学生,获取练习题和答案
router.get('/getTestExercise', function (req, res) {
  //console.log(reqUser);
  let reqUser = req.query.user;
  TestQuestion.findOne({
    user: reqUser,
    state: 1,
    currTestType: 106,
  }).then(function (testQuestion) {
    if (testQuestion) {
      res.end(JSON.stringify({
        testQuestion: testQuestion,
      }));
    } else {
      res.status(404).send({err: err,});
    }
  })
});

//学生,历史练习
router.get('/stuHistoryPractice', function (req, res) {
  let reqUser = req.query.user;
  console.log(reqUser);
  TestQuestion.find({
    user: reqUser,
    state: 2,
    currTestType: 106,
  }).sort({testQuestion:-1}).then(function (testQuestion) {
    TestQuestionInfo.find({
      user: reqUser,
      state: 2,
      currTestType: 106,
    }).sort({testQuestion:-1}).then(function (testQuestionInfo) {
      if (testQuestionInfo) {
        res.end(JSON.stringify({
          testQuestion: testQuestion,
          testQuestionInfo: testQuestionInfo
        }));
      } else {
        res.status(404).send({err: err,});
      }
    })
  })
});


module.exports = router;
