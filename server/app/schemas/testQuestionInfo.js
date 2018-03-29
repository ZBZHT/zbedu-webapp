const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//定义testQuestionInfo
module.exports = new Schema({
  user: String,
  currTestType: Number,
  state:Number,   //0:表示未开始考试,不显示  1:表示已开始考试,显示  2:表示已经考试结束
  testQuestion: Number,
  startTime: Date,
  currAnswer: Array,
  currState: Array,
  error: Array,
  sorce: Number,
  startTimeHours:Number,
  startTimeMinutes:Number,
  startTimeSeconds:Number,
  testTimeMinutes:Number,
  testTimeSeconds:Number,
  isCheckNum:Number
});
