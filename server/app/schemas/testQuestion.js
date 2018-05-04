const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义testQuestion
module.exports = new Schema({
  status: Number, //
  user: {
    type: String,
    required: true, //设定是否必填
  },
  msg: String,
  theme: String,
  testId: Number,
  state:Number,   //0:表示未开始考试,不显示  1:表示已开始考试,显示  2:表示已经考试结束
  currTestType: Number,
  currTestNum: {
    type: Number,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  title: String,
  desc: String,
  date1: Date,
  date2: Date,
  date3: String,
  date4: String,
  timeHour: Number,
  timeMin: String,
  question: Array,
  allScore: Number,
});

