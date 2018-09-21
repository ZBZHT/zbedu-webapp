const express = require('express');
const router = express.Router();
const TestQuestionInfo = require('../app/models/TestQuestionInfo');
const TestQuestion = require('../app/models/TestQuestion');
const TeachNewTestQ = require('../app/models/TeachNewTestQ');
const Question = require('../app/models/Question');
const Student = require('../app/models/Student');
const Teacher = require('../app/models/Teacher');
const core = require('../utils/core');

//定义返回格式
let testResult;
router.use(function (req, res, next) {
  testResult = {
    testItemsNum: [],
    testLength: '',
    testQuestion: 0,
    resId : 0
  };
  next();
});


//老师创建考试
function newTestQuestion(req, res, next) {
  let reqQ = req.query;
  if (req.session.users.userType === 'S' || req.session.users.userType === 'O') {
    res.end(JSON.stringify({ code:0, msg: '该用户无权限'}));
  } else {
    TeachNewTestQ.find({theme: reqQ.theme}).then(function (tt) {
      if (tt.length !== 0) {
        res.end(JSON.stringify({code : 1, Msg: '考试题目重复,请换个名字试试'}));

      } else if (tt.length === 0){
        TeachNewTestQ.find().then(function (result) {
          function start() {
            return new Promise((resolve, reject) => {
              resolve('start');
            });
          }
          start()
            .then(data => {
              if (result.length !== 0) {
                let EE = [];
                for (let i=0; i<=result.length-1; i++) {
                  EE.push(result[i].id)
                }
                testResult.resId = (Math.max.apply(null, EE)) + 1;
              } else {
                testResult.resId = 1;
              }
            })
            .then(data => {
              //console.log(testResult.resId);
              let teachNewTestQ = new TeachNewTestQ({
                id : testResult.resId,
                user: reqQ.user,
                theme: reqQ.theme,
                name: reqQ.name,
                nameId: reqQ.nameId,
                currTestType: reqQ.currTestType,
                state: 0,
                showGradeState:0,
                date1: reqQ.date1,
                date2: reqQ.date2,
                date3: reqQ.date3,
                date4: reqQ.date4,
                date5: reqQ.date5,
                date6: reqQ.date6,
                num: reqQ.num,
                timeHour: reqQ.timeHour,
                timeMin: reqQ.timeMin,
                major: reqQ.major,
                classGrade: reqQ.classGrade,
                newData: reqQ.newData,
                allScore: reqQ.allScore,
                question: [],
              });
              teachNewTestQ.save(function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Success! teachNewTestQ');
                }
              });
            })

            .then(data => {
              next();
            });
        });
      }
    });
  }
}

//教师发题
function distTestQuestion(req, res, next) {
  let reqQ = req.query;
  Question.find(
  ).then(function (question) {
    if (question) {
      let testItems = core.getArrayItems(question, reqQ.num);
      //testItems = JSON.stringify(testItems);
      for (let i=0; i<=testItems.length-1; i++) {
        testResult.testItemsNum.push(testItems[i].num)
      }
      Student.find({
        major: reqQ.major,
        classGrade: { "$in": reqQ.classGrade }
      }).then(function (stu) {
        TestQuestionInfo.find({
        }).sort({currTestNum:-1}).then(function (testQ) {
          if (testQ.length <= 0) {
            testResult.testLength = 0;
          } else {
            testResult.testLength = testQ[0].currTestNum;
          }
          for (let i=0; i<stu.length; i++) {
            testResult.testLength = Number(testResult.testLength) + 1;
            //console.log(testResult.testLength);
            //创建所有学生试题及考试信息
            let testQuestionInfo = new TestQuestionInfo({
              user: stu[i].user,
              currTestType : reqQ.currTestType,
              currTestNum: testResult.testLength,
              theme: reqQ.theme,
              msg: "error parameter",
              testId: 1,
              state: 0,
              status: 0,
              showGradeState:0,
              title: '',
              desc: "biansuqi test",
              startTime: '',
              currAnswer: '',
              currState: '',
              currIsId: [],
              error: '',
              sorce: '',
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
              date5: reqQ.date5,
              date6: reqQ.date6,
              timeHour: reqQ.timeHour,
              timeMin: reqQ.timeMin,
              allScore: reqQ.allScore,
              major: reqQ.major,
              classGrade: stu[i].classGrade,
            });
            testQuestionInfo.question = testResult.testItemsNum;
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
    }
  }).then(function () {
    next();
  });
}

//教师,创建考试
router.get('/addTestQuestion', newTestQuestion, distTestQuestion, function (req, res) {
  //console.log('csdf');
  let reqQ = req.query;
  TeachNewTestQ.find({
    user: reqQ.user,
    theme: reqQ.theme,
    state: 0
  }).then(function (result) {
    if (result) {
      res.end(JSON.stringify({code : 0, Msg: '创建考试成功'}));
    } else {
      res.end(JSON.stringify({code : 1, Msg: '创建考试失败'}));
    }
  });
});

//学生开始考试 ,  获取考试答案信息
router.get('/getTestQuesInfo', function (req, res) {
  let reqQ = req.query;
  //console.log(req.query);
  TestQuestionInfo.findOne({
    user: reqQ.user,
    state: 1,
  }).then(function (info) {
    if (info) {
      Question.find({
        num: { "$in": info.question }
      }).then(function (result) {
        info.question = result;
        res.end(JSON.stringify(info));
      });
    } else {
      res.end(JSON.stringify({code : 1, msg: '未找到数据'}));
    }
  });
});

//更新考试答案
router.get('/update', function (req, res) {
  let reqQ = req.query;
  let code = '';
  //console.log(reqQ);

  TestQuestionInfo.findOneAndUpdate({
      currTestNum: reqQ.currTestNum
    }, {
      user: reqQ.user,
      startTime: reqQ.startTime,
      currAnswer: reqQ.currAnswer,
      currState: reqQ.currState,
      currIsId: reqQ.currIsId,
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
        console.log('更新答案成功');
        code = 0;
        res.end(JSON.stringify(code));
      }
    });
});

// 提交
router.get('/submitQuestionInfo', function (req, res) {
  let reqQ = req.query;
  //console.log(reqQ);
  TestQuestionInfo.findOneAndUpdate({
      currTestNum: reqQ.currTestNum
    }, {
      state: 2,
      startTime: reqQ.startTime,
      currAnswer: reqQ.currAnswer,
      currState: reqQ.currState,
      error: reqQ.error,
      sorce: reqQ.sorce,
      testTimeMinutes: reqQ.testTimeMinutes,
      testTimeSeconds: reqQ.testTimeSeconds,
      isCheckNum: reqQ.isCheckNum,
      currIsId: reqQ.currIsId,
    }, //{upsert: true},
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('提交成功');
        res.end(JSON.stringify({code: 0}));
      }
    });
});

//提交考试答案
router.get('/submitQuestion', function (req, res) {
  let reqQ = req.query;
  let reqTestQuestion = reqQ.testQuestion;
  //console.log('csdf');
  //console.log(reqQ.startTime);
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
        res.end(JSON.stringify({code: 0, msg: '更新信息成功'}));
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
    res.end(JSON.stringify(msg));
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
    //console.log(reqUser);
    TestQuestionInfo.find({
      user: reqUser,
      state: 0,
      currTestType: { "$in": [101,102,103,104,105] }
    }).then(function (result) {
      //console.log(result);
      res.end(JSON.stringify(result));
    });
});

//学生,开始考试 获取待考试题
router.get('/getTestQ', function (req, res) {
  if (req.query.currTestNum !== '') {
    let reqCurrTestNum = req.query.currTestNum;
    TestQuestionInfo.findOne({
      currTestNum: reqCurrTestNum
    }).then(function (info) {
      if (info) {
        Question.find({
        num: { "$in": info.question }
        }).then(function (result) {
          info.question = result;
          res.end(JSON.stringify(info));
        });
      } else {
        res.end(JSON.stringify({code : 1, msg: '未找到数据'}));
      }
    });
  } else {
    res.end(JSON.stringify({code : 1, msg: '为获取到currTestNum'}));
  }
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
