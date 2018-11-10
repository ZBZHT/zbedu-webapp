//往数据库中添加comments记录
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const StuLeave = require('../app/models/StuLeave');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});
//实例化
let stuLeave = new StuLeave(
  {
    "startDate": "2018-06-18",
    "endDate": "2018-06-20",
    "startTime": "10:00",
    "endTime": "11:00",
    "stuName": "某学生",
    "className": "镇江培训",
    "reason": "家中有事",
    "state": 0,

  }
);
stuLeave.save();

