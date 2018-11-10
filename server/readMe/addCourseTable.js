//往数据库中添加comments记录
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const CourseTable = require('../app/models/CourseTable');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});
//实例化
let courseTable = new CourseTable(
  {
    createDate: "2018-06-18",
    courseDate: "2018-07-02",
    createName: "琴老师",
    className: "镇江培训",
    teachList:  [ "张老师", "付老师" ],
    course: [
      {
        "newCourse": [
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          }
        ],
        "newCourse2": [
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          }
        ],
        "newCourse3": [
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          }
        ],
        "newCourse4": [
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          }
        ],
        "newCourse5": [
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          },
          {
            "startTime": "9:00",
            "endTime": "10:00",
            "teacher": "付老师",
            "courseName": "新能源电池技术",
            "courseAddress": "某某5楼"
          }
        ]
      }
    ],
  }
);
courseTable.save();

