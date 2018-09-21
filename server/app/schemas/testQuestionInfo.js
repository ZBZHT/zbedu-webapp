const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//定义testQuestionInfo
module.exports = new Schema({
  user: {
    type: String,
    required: true, //设定是否必填
  },
  theme: String,
  currTestType: Number,
  state:Number,   //0:表示未开始考试,不显示  1:表示已开始考试,显示  2:表示已经考试结束
  currTestNum: {
    type: Number,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  msg: String,
  testId: Number, //有没有用到
  startTime: Date,
  currAnswer: Array,
  currState: Array,
  currIsId: Array,
  error: Array,
  sorce: Number,
  showGradeState:Number,   //0:表示未公布成绩   2:表示已经公布成绩
  startTestTime: Date,
  testTimeMinutes:Number,
  testTimeSeconds:Number,
  isCheckNum:Number,
  title: String,
  desc: String,
  date1: Date,
  date2: Date,
  date3: String,
  date4: String,
  date5: String,
  date6: String,
  timeHour: Number,
  timeMin: String,
  allScore: Number,
  question: [],
  major: String,
  classGrade: String,
});
