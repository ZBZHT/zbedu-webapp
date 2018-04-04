const express = require('express');
const router = express.Router();
const TestQuestion = require('../app/models/TestQuestion');
const TestQuestionInfo = require('../app/models/TestQuestionInfo');
const TeachNewTestQ = require('../app/models/TeachNewTestQ');
const Question = require('../app/models/Question');
const Student = require('../app/models/Student');
const Teacher = require('../app/models/Teacher');
const core = require('../utils/core');

//设置跨域请求
/*router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
    /让options请求快速返回/
  } else {next();}
});*/

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
        res.end(JSON.stringify({code : 1 }));
      } else {
        console.log('Success! teachNewTestQ');
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
        let testQ = new TestQuestion({
          user: stu[i].user,
          currTestType : reqQ.currTestType,
          currTestNum: testResult.testLength,
          msg: "error parameter",
          testId: 1,
          state: 0,
          status: 0,
          title: reqQ.theme,
          desc: "biansuqi test",
          date1: reqQ.date1,
          date2: reqQ.date2,
          timeHour: reqQ.timeHour,
        });
        testQ.question = testItems;

        testQ.save(function (err) {
          if (err) console.log(err);
          console.log('Success!');
        });
        //创建所有学生试题记录
        let testQuestionInfo = new TestQuestionInfo({
          user: stu[i].user,
          currTestType: reqQ.currTestType,
          testQuestion: testResult.testLength,
          state: 0,
          startTime: '',
          currAnswer: '',
          currState: '',
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
          if (err) console.log(err);
          console.log('Success!');
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

//教师,成绩管理
router.get('/scoreManData', function (req, res) {
  let reqUser = req.query;
  TestQuestionInfo.find({
    classGrade: reqUser.classGrade,
    major: reqUser.major
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
    if (msgOne) {
      res.end(JSON.stringify(msgOne));
    } else {
      res.end(JSON.stringify({code: 1}));
    }
  })
});

//学生,历史考试请求
router.get('/stuHistoryTestData', function (req, res) {
  let reqUser = req.query.user;
  console.log(reqUser);
  TestQuestion.find({
    user: reqUser,
    state: 2,
  }).then(function (result) {
    //console.log(result);
    res.end(JSON.stringify(result));
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

//学生,历史练习
router.get('/stuHistoryPractice', function (req, res) {
  let reqUser = req.query.user;
  console.log(reqUser);
  TestQuestion.find({
    user: reqUser,
    state: 2,
    currTestType: 106,
  }).then(function (result) {
    //console.log(result);
    res.end(JSON.stringify(result));
  });
});






module.exports = router;
