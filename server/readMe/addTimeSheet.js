//往数据库中添加comments记录
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const TimeSheet = require('../app/models/TimeSheet');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});
//实例化
let timeSheet = new TimeSheet(
  {
    courseName: "计算机原理",
    courseDate: "2018-07-04",
    teacher: "cc",
    className: "镇江培训",
    startTime: "09:00",
    endTime: "10:00",
    stateList:[
      {
        "stuName": "学生1",
        "state": 0
      },
      {
        "stuName": "学生2",
        "state": 1
      },
      {
        "stuName": "学生3",
        "state": 2
      },
      {
        "stuName": "学生4",
        "state": 3
      },
      {
        "stuName": "学生5",
        "state": 3
      },
      {
        "stuName": "学生6",
        "state": 3
      },
      {
        "stuName": "学生7",
        "state": 3
      },
      {
        "stuName": "学生8",
        "state": 3
      },
      {
        "stuName": "学生9",
        "state": 3
      },
      {
        "stuName": "学生10",
        "state": 3
      }
    ],

  }
);
timeSheet.save();

