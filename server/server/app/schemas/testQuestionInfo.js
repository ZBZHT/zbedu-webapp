const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//定义testQuestionInfo
module.exports = new Schema({
  user: String,
  currTestId: Number,
  state:Number,   //0:表示未开始不显示  1:表示已开始显示  2:表示已经考试结束
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
