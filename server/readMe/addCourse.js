//添加公司内部用户信息
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const TechCosCou = require('../app/models/TechCosCou');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});

//实例化几个学生
let a = new TechCosCou({
  userID: '00000001',
  newTime: new Date(),
  tab: [
    {
      label: '新能源电池',
      course: [
        {
        label: '第一章'
        },
        {
        label: '第二章'
      }]
    },
    {
      label: '发动机维修',
      course: [
        {
          label: '第一章'
        },
        {
          label: '第二章'
        }]
    }
  ],
});


a.save();
