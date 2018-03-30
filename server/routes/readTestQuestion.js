const express = require('express');
const router = express.Router();
const TestQuestion = require('../app/models/TestQuestion');
const TestQuestionInfo = require('../app/models/TestQuestionInfo');
const TeachNewTestQ = require('../app/models/TeachNewTestQ');
const Question = require('../app/models/Question');
const core = require('../utils/core');

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

//定义返回格式
let testResult;
router.use(function (req, res, next) {
  testResult = {
    testLength: '',
    testQuestion: '',
    resId : 100
  };
  next();
});

//新增testQuestion的方法
function newTestQuestion(req, res, next) {
  let reqQ = req.query;
  let reqUser = reqQ.user;
  let currTestType = reqQ.currTestType;
  console.log('11');

  TestQuestion.find({
    user: reqUser
  }).then(function (msg) {
    console.log(msg);
    testResult.testLength = msg.length;

    let testQuestion = new TestQuestion({
      "status": 0,
      "user": reqUser,
      "msg": "error parameter",
      "currTestType" : currTestType,
      "state": 1,
      "currTestNum": testResult.testLength + 1,
      "title": "发动机7考试",
      "desc": "biansuqi test"
    });

    let testQuestionInfo = new TestQuestionInfo({
      user: reqUser,
      currTestType: currTestType,
      testQuestion: testResult.testLength + 1,
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

    testQuestion.question.push(
      {
        "num": 1,
        "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
        "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
        "value":["A","B","C","D"],
        "name":"que1",
        "forId":["que1A","que1B","que1C","que1D"],
        "answer": "A",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 2,
        "desc": "变速器增加了超速挡可以( )。",
        "options": ["A、提高发动机转速", "B、降低发动机负荷", "C、提高动力性", "D、提高经济性"],
        "value":["A","B","C","D"],
        "name":"que2",
        "forId":["que2A","que2B","que2C","que2D"],
        "answer": "D",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 3,
        "desc": "自动变速器的油泵，一般由（ ）驱动。",
        "options": ["A、变矩器外壳", "B、泵轮", "C、变速器外壳", "D、导轮"],
        "value":["A","B","C","D"],
        "name":"que3",
        "forId":["que3A","que3B","que3C","que3D"],
        "answer": "A",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 4,
        "desc": "单行星排传动中，（  ）为固定元件时，将成为倒档输出。",
        "options":["A、太阳轮", "B、行星架", "C、齿圈", "D、行星轮"],
        "value":["A","B","C","D"],
        "name":"que4",
        "forId":["que4A","que4B","que4C","que4D"],
        "answer": "B",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 5,
        "desc": "变矩器的传递效率(  )。",
        "options": ["A、等于1", "B、大于1", "C、小于等于1", "D、都正确"],
        "value":["A","B","C","D"],
        "name":"que5",
        "forId":["que5A","que5B","que5C","que5D"],
        "answer": "C",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 6,
        "desc": "一般情况下，自动变速器油(ATF)的更换里程一般为2年或(   )km。",
        "options":["A、2000", "B、60000", "C、10000", "D、4000"],
        "value":["A","B","C","D"],
        "name":"que6",
        "forId":["que6A","que6B","que6C","que6D"],
        "answer": "B",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 7,
        "desc": "遇到冰雪道路，应将自动变速器的操纵杆置于(    )。",
        "options":["A、P位置", "B、D位置", "C、强制低档位置", "D、N位"],
        "value":["A","B","C","D"],
        "name":"que7",
        "forId":["que7A","que7B","que7C","que7D"],
        "answer": "C",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 8,
        "desc": "汽车起步加速时，适当提前加档可(  )。",
        "options":["A、提高车辆的经济性", "B、提高车辆的动力性", "C、提高车辆的加速能力", "D、提高爬坡能力"],
        "value":["A","B","C","D"],
        "name":"que8",
        "forId":["que8A","que8B","que8C","que8D"],
        "answer": "A",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 9,
        "desc": "自动变速器操纵手柄禁止在N位空档高速滑行来节油的主要原因是(  )。",
        "options":["A、车辆稳定性差", "B、换档执行元件和齿轮机构易磨损", "C、不能节油", "D、没有发动机制动功能"],
        "value":["A","B","C","D"],
        "name":"que9",
        "forId":["que9A","que9B","que9C","que9D"],
        "answer": "B",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 10,
        "desc": "在行星齿轮机构中，太阳轮（ ）和行星架称为行星齿轮机构的三个基本元件。",
        "options":["A、齿套", "B、固定套", "C、齿毂", "D、齿圈"],
        "value":["A","B","C","D"],
        "name":"que10",
        "forId":["que10A","que10B","que10C","que10D"],
        "answer": "D",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 11,
        "desc": "装配自动变速器各部件前，应用206kPa干燥洁净的压缩空气对各油孔依次吹入压缩空气进行检验。",
        "value":["A","B"],
        "options":["A、对", "B、错"],
        "name":"que11",
        "forId":["que11A","que11B"],
        "answer": "A",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 12,
        "desc": "液力偶合器和液力变矩器均属静液传动装置。",
        "options":["A、对", "B、错"],
        "value":["A","B"],
        "name":"que12",
        "forId":["que12A","que12B"],
        "answer": "B",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 13,
        "desc": "只有当泵轮与涡轮的转速相等时，液力偶合器才能起传动作用。",
        "options":["A、对", "B、错"],
        "value":["A","B"],
        "name":"que13",
        "forId":["que13A","que13B"],
        "answer": "B",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 14,
        "desc": "汽车在运行中，液力偶合器可以使发动机与传动系彻底分离。",
        "options":["A、对", "B、错"],
        "value":["A","B"],
        "name":"que14",
        "forId":["que14A","que14B"],
        "answer": "B",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 15,
        "desc": "P档停车时使用，防止车辆滑溜。在P档不允许启动发动机。",
        "options":["A、对", "B、错"],
        "value":["A","B"],
        "name":"que15",
        "forId":["que15A","que15B"],
        "answer": "B",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 16,
        "desc": "锁止离合器的作用是在汽车低速行驶时，将液力传动变为直接传动，减少传动损失。",
        "options":["A、对", "B、错"],
        "value":["A","B"],
        "name":"que16",
        "forId":["que16A","que16B"],
        "answer": "B",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 17,
        "desc": "与手动变速器相比，自动变速器具有操作简便、乘坐舒适等优点。",
        "options":["A、对", "B、错"],
        "value":["A","B"],
        "name":"que17",
        "forId":["que17A","que17B"],
        "answer": "A",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 18,
        "desc": "当发动机故障不能工作需将车辆拖回时，应将驱动轮架起或拆除传动轴。",
        "options":["A、对", "B、错"],
        "value":["A","B"],
        "name":"que18",
        "forId":["que18A","que18B"],
        "answer": "A",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 19,
        "desc": "行星齿轮的自转是指在差速器内行星齿轮绕半轴轴线的转动。",
        "options":["A、对", "B、错"],
        "value":["A","B"],
        "name":"que19",
        "forId":["que19A","que19B"],
        "answer": "B",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      },
      {
        "num": 20,
        "desc": "单向离合器利用变速器油使一个部件沿着一个方向旋转，而沿着另一个方向旋转时",
        "options":["A、对", "B、错"],
        "value":["A","B"],
        "name":"que20",
        "forId":["que20A","que20B"],
        "answer": "B",
        "type": "radio",
        "major": "汽车专业",
        "title1": '新能源汽车',
        "title2": '纯电动汽车',
        "title3": '纯电动汽车高压安全操作与保养维护',
        "title4": '纯电动汽车基本信息收集与介绍',
        "title5": '',
      }
    );

    testQuestionInfo.save(function (err) {
      if (err) return handleError(err);
      console.log('Success!');
    });

    testQuestion.save(function (err) {
      if (err) return handleError(err);
      console.log('Success!');
      next()
    });
  });
}

//老师创建考试新增考题
function addNewTestQuestion(req, res, next) {
  let reqQ = req.query;

  TeachNewTestQ.find().sort({id:-1}).then(function (result) {
    //console.log(result[0].id);
    if (result.length != 0) {
      testResult.resId = Number(result[0].id) + 1;
    } else {
      testResult.resId = 100;
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
      newData: reqQ.newData
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
function disTestQuestion(req, res, next) {
  let reqQ = req.query;
  //console.log(reqQ);

  Question.find(

  ).then(function (result) {
    //console.log(result[0].id);
    let ee = core.getArrayItems(result, reqQ.num);
    console.log(ee);

  });
  next()
}

//刷新查询整个文档
router.get('/all', function (req, res) {
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
});

//点击查询整个文档
router.get('/clickQuery', newTestQuestion, function (req, res) {
  let reqCurrTestNum = testResult.testLength + 1 ;

  console.log(reqCurrTestNum);
      TestQuestion.findOne({
        currTestNum: reqCurrTestNum
      }).then(function (msg) {
        //console.log(msg);
        result = msg;
        res.end(JSON.stringify(result));
  });
});

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
router.get('/addTestQuestion', addNewTestQuestion, disTestQuestion, function (req, res) {
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






module.exports = router;
