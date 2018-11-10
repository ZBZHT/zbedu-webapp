const express = require('express');
const router = express.Router();
const TestQuestion = require('../app/models/TestQuestion');
const TestQuestionInfo = require('../app/models/TestQuestionInfo');
const TeachNewTestQ = require('../app/models/TeachNewTestQ');
const Question = require('../app/models/Question');
const Student = require('../app/models/Student');
const Teacher = require('../app/models/Teacher');
const core = require('../utils/core');
const moment = require('moment');

//定义返回格式
let testResult;
router.use(function (req, res, next) {
  testResult = {
    question: [],
    testItemsNum: [],
    testLength: '',
    testQuestion: 0,
    resId : 0
  };
  next();
});

//教师,待考试请求
function setState(req, res, next) {
  let reqUser = req.query.user;
  TeachNewTestQ.find({
    user: reqUser,
    state: 0,
  }).then(function (result) {
    let nowTime = moment(new Date()).unix();
    let hosTime = '';
    if (result.length !== 0) {
      for (let i=0; i<=result.length-1; i++) {
        hosTime = moment(result[i].date2).format("YYYY-MM-DD") + "," + result[i].date4;
        let EE = moment(hosTime).unix();
        if (Number(nowTime) >= Number(EE)) {
          TeachNewTestQ.findOneAndUpdate({  //改变考试答案状态为2
              id: result[i].id,
            }, {
              state: 2,
            },
            function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log('TeachNewTestQ更新state=2成功');
                TestQuestionInfo.update({  //改变考试答案状态为2
                  theme: result[i].theme,
                },{$set:{state: 2}},{multi: true},function (err) {
                  if (err) {
                      console.log(err);
                  } else {
                    console.log('TestQuestionInfo更新state=2成功');
                  }
                })
              }
            });

        }
      }
    }
  }).then(function () {
    next()
  });
}
router.get('/toTestData',setState, function (req, res) {
  let reqUser = req.query.user;
  //console.log(reqUser);
    TeachNewTestQ.find({ user: reqUser, state: 0,}).then(function (testQ) {
      //console.log(testQ);
      if (testQ.length !== 0) {
        res.end(JSON.stringify({result: testQ, code:0, msg:'获取成功'}));
      } else {
        res.end(JSON.stringify({code:1, msg:'获取失败'}));
      }
    })
});

//教师,删除创建的考试
router.get('/dellNewTestQ', function (req, res) {
  let reqId = req.query.id;
  TeachNewTestQ.findOne({id: reqId}).then(function (result) {
    //console.log(result);
    TestQuestionInfo.remove({theme: result.theme}, function (err) {
      if (err) {
        return res.status(404).send({err: err,});
      } else {
        TeachNewTestQ.remove({id: reqId}, function (err) {
          if (err) {
            return res.status(404).send({err: err,});
          } else {
            console.log('删除数据成功');
            res.end(JSON.stringify({code : 0 }));
          }
        })
      }
    })

  });
  /**/
});

//教师,历史考试请求
router.get('/historyTestData', function (req, res) {
  let reqUser = req.query.user;
  TeachNewTestQ.find({
    user: reqUser,
    state: 2,
    currTestType: { "$in": [101,102,103,104,105] }
  }).then(function (result) {
    //console.log(result);
    if (result.length !== 0) {
      res.status(200).send({ code: 0, result: result, msg: '获取数据成功'});
    } else {
      res.status(200).send({ code: 1, msg: '无数据'});
    }
  });
});

//教师,成绩管理请求
router.get('/checkGradesData', function (req, res) {
  let reqQue = req.query;
  //console.log(reqQue);
  TestQuestionInfo.find({
    username: reqQue.userneme,
    theme: reqQue.theme,
    state: 2,
  }).then(function (result) {
    //console.log(result);
    if (result.length !== 0) {
      res.status(200).send({ code: 0, result: result, msg: '获取数据成功'});
    } else {
      res.status(200).send({ code: 1, msg: '无数据'});
    }
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
    currTestType: {"$in": [101,102,103,104,105]},
  }).sort({currTestNum:-1}).then(function (testQuestionInfo) {
    if (testQuestionInfo) {
      testQuestionInfo.forEach(function (item1, i, arr) {
        arr[i].question.forEach(function (item2, j, arr) {
          Question.find({num: {"$in": item2}}).then(function (result) {
            testQuestionInfo[i].question[j] = result;
          })
        })
      });
      setTimeout(function(){
        //console.log(testQuestionInfo);
        res.end(JSON.stringify({
         testQuestionInfo: testQuestionInfo
         }));
      }, 500);
    }
  });
  //修改公布考试的状态码
  TestQuestionInfo.find({
    user: reqUser,
    showGradeState: 0,
  }).then(function (result) {
    let nowTime = moment(new Date()).unix();
    let hosTime = '';
    if (result.length !== 0) {
      for (let i=0; i<=result.length-1; i++) {
        hosTime = moment(result[i].date5).format("YYYY-MM-DD") + "," + result[i].date6;
        let EE = moment(hosTime).unix();
        if (Number(nowTime) >= Number(EE)) {
          TestQuestionInfo.findOneAndUpdate({  //改变考试答案状态为2
              id: result[i].id,
            }, {
              showGradeState: 2,
            },
            function (err) {
              if (err) {
                console.log(err);
              } else {
                //console.log('TeachNewTestQ更新showGradeState=2成功');
                TestQuestionInfo.update({  //改变考试答案状态为2
                  theme: result[i].theme,
                },{$set:{showGradeState: 2}},{multi: true},function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    //console.log('TestQuestionInfo更新showGradeState=2成功');
                  }
                })
              }
            });

        }
      }
    }
  });
});

//学生,创建练习
router.get('/stuNewExercise', function (req, res) {
  let reqQ = req.query;
  //console.log(reqQ);
  Question.find(
  ).then(function (question) {
    let testItems = core.getArrayItems(question, reqQ.num);
    for (let i=0; i<=testItems.length-1; i++) {
      testResult.testItemsNum.push(testItems[i].num)
    }
    TestQuestionInfo.find({
    }).sort({currTestNum:-1}).then(function (testQ) {
      let EE = [];
      function start() {
        return new Promise((resolve, reject) => {
          resolve('start');
        });
      }
      start()
        .then(data => {
          if (testQ.length !== 0) {
            for (let i=0; i<=testQ.length-1; i++) {
              EE.push(testQ[i].currTestNum)
            }
            testResult.testLength = (Math.max.apply(null, EE)) + 1;
          } else {
            testResult.testLength = 1;
          }
        })
        .then(data => {
          //创建学生练习试题
          let testQuestionInfo = new TestQuestionInfo({
            user: reqQ.user,
            currTestType : 106,
            currTestNum: testResult.testLength,
            theme: '练习' + testResult.testLength,
            msg: "error parameter",
            testId: 1,
            state: 1,
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
              //console.log('Success!');
              res.end(JSON.stringify({code: 0,msg: '练习创建成功'}));
            }
          });
        })
    });
  });
});

//学生,获取练习题和答案
router.get('/getTestExercise', function (req, res) {
  //console.log(reqUser);
  let reqUser = req.query.user;
  TestQuestionInfo.find({
    user: reqUser,
    state: 1,
    currTestType: 106,
  }).sort({currTestNum:-1}).then(function (info) {
    if (info.length !== 0) {
      Question.find({
        num: { "$in": info[0].question }
      }).then(function (result) {
        //console.log(result);
        info[0].question = result;
        res.end(JSON.stringify({ testQuestion: info[0] }));
      });
    } else {
      res.end(JSON.stringify({code : 1, msg: '未找到数据'}));
    }
  })
});

//学生,历史练习
router.get('/stuHistoryPractice', function (req, res) {
  let reqUser = req.query.user;
  TestQuestionInfo.find({
    user: reqUser,
    state: 2,
    currTestType: 106,
  }).sort({currTestNum:-1}).then(function (testQuestionInfo) {
    if (testQuestionInfo) {
      testQuestionInfo.forEach(function (item1, i, arr) {
        arr[i].question.forEach(function (item2, j, arr) {
          Question.find({num: {"$in": item2}}).then(function (result) {
            testQuestionInfo[i].question[j] = result;
          })
        })
      });
      setTimeout(function(){
        //console.log(testQuestionInfo);
        res.end(JSON.stringify({
          testQuestionInfo: testQuestionInfo
        }));
      }, 300);
    }
  });
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
      if (question.length > 0) {
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
        res.status(200).send({code: 0, msg: '获取成功', result: resQues, });
      } else {
        res.status(404).send({code: 0, msg: '获取失败' });
      }
    })
  }

});

module.exports = router;
