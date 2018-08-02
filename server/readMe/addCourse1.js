//添加公司内部用户信息
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const SetCourse = require('../app/models/SetCourse');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});

//实例化几个学生
let a = new SetCourse(
  {
    bestCourse: [
      {
        label: '基本信息收集与介绍',
        describe: '检测前的安全操作事项和详细的操作步骤，电动汽车安全操作的注意事项',
        teachingMaterial: 'EV系列-1-1-纯电动汽车基本信息收集与介绍.pdf',
        videoTitle: [],
        workPage: '',
        homeWorkData: [],
        courseId: 1111,
        bestCourseType:0
      }
    ],
    suggCourse: [
      {
        label: '基本信息收集与介绍',
        describe: '检测前的安全操作事项和详细的操作步骤，电动汽车安全操作的注意事项',
        teachingMaterial: 'EV系列-1-1-纯电动汽车基本信息收集与介绍.pdf',
        videoTitle: [],
        workPage: '',
        homeWorkData: [],
        courseId: 1111,
        suggCourseType:0
      },
      {
        label: '基本信息收集与介绍',
        describe: '检测前的安全操作事项和详细的操作步骤，电动汽车安全操作的注意事项',
        teachingMaterial: 'EV系列-1-1-纯电动汽车基本信息收集与介绍.pdf',
        videoTitle: [],
        workPage: '',
        homeWorkData: [],
        courseId: 1111,
        suggCourseType:0
      }
    ],
  }
);
let bestCourse = [
  {
    label: '基本信息收集与介绍',
    describe: '检测前的安全操作事项和详细的操作步骤，电动汽车安全操作的注意事项',
    teachingMaterial: 'EV系列-1-1-纯电动汽车基本信息收集与介绍.pdf',
    videoTitle: [],
    workPage: '',
    homeWorkData: [],
    courseId: 1111,
    suggCourseType:0
  },
  {
    label: '基本信息收集与介绍',
    describe: '检测前的安全操作事项和详细的操作步骤，电动汽车安全操作的注意事项',
    teachingMaterial: 'EV系列-1-1-纯电动汽车基本信息收集与介绍.pdf',
    videoTitle: [],
    workPage: '',
    homeWorkData: [],
    courseId: 1111,
    suggCourseType:0
  }
]
// SetCourse.findOneAndUpdate({
//   _id:"5b5abef597385450c0d4dfa1"
// }, {
//   //$set: { "bestcourse" : newbestCourse }
//   bestCourse : bestCourse
// }, function (err) {
//   if (err) {
//     console.log(err);
//     res.status(200).send({code: 1, Msg: '添加失败',});
//   } else {
//     console.log('添加成功');
//     //res.status(200).send({code: 0, Msg: '添加成功',});
//   }
// });

a.save();
