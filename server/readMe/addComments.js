//往数据库中添加comments记录
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});

//定义result
let resultSchema = new mongoose.Schema({
  type: Number,
  num: Number,
  source: String,
  title: String,
  user: String,
  text: String,
  time: String,
  score: String,
  target: String,
  targetId: String
});
let Result = mongoose.model("Result", resultSchema);

//定义comments
let commentsSchema = new mongoose.Schema({
  status: String,
  msg: String,
  result: [resultSchema]
});
let Comments = mongoose.model("Comments", commentsSchema);

//添加新comment
let comments = new Comments({
  status: '0',
  msg: "comments data a success"
});
comments.result.push({
    "type":"1",
    "num":"1",
    "source":"course",
    "title":"动力电池系统故障检修",
    "user":"橘子1",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"2",
    "target":"",
    "targetId":""
  },
  {
    "type":"2",
    "num":"2",
    "source":"course",
    "title":"动力电池系统故障检修",
    "user":"葡萄🍇",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"2",
    "target":"橘子1",
    "targetId":"0"
  },
  {
    "type":"3",
    "num":"3",
    "source":"course",
    "title":"动力电池系统故障检修",
    "user":"西瓜🍉",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"2",
    "target":"葡萄🍇",
    "targetId":"1"
  },
  {
    "type":"1",
    "num":"4",
    "source":"course",
    "title":"安全操作与新车交接检查",
    "user":"橘子2",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"1",
    "target":"",
    "targetId":""
  },
  {
    "type":"2",
    "num":"5",
    "source":"course",
    "title":"安全操作与新车交接检查",
    "user":"apple",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"",
    "target":"橘子2",
    "targetId":"3"
  },
  {
    "type":"2",
    "num":"6",
    "source":"course",
    "title":"动力电池系统故障检修",
    "user":"rose",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"",
    "target":"橘子2",
    "targetId":"3"
  },
  {
    "type":"3",
    "num":"7",
    "source":"course",
    "title":"动力电池系统故障检修",
    "user":"柚子",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"",
    "target":"apple",
    "targetId":"4"
  },
  {
    "type":"1",
    "num":"8",
    "source":"course",
    "title":"动力电池系统故障检修",
    "user":"橘子3",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"4",
    "target":"",
    "targetId":""
  },
  {
    "type":"3",
    "num":"9",
    "source":"course",
    "title":"动力电池系统故障检修",
    "user":"橘子",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"",
    "target":"apple",
    "targetId":"4"
  },
  {
    "type":"3",
    "num":"10",
    "source":"course",
    "title":"动力电池系统故障检修",
    "user":"橘子",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"",
    "target":"apple",
    "targetId":"4"
  },
  {
    "type":"2",
    "num":"11",
    "source":"course",
    "title":"动力电池系统故障检修",
    "user":"徐瑞",
    "text":"不错，微课拍的很专业，也很详细",
    "time":"2017-12-12 10:20:36",
    "score":"2",
    "target":"橘子1",
    "targetId":"0"
  });
comments.save(function (err) {
  if (err) return handleError(err);
  console.log('Success!');
});

