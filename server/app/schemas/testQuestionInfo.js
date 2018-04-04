const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//定义testQuestionInfo
module.exports = new Schema({
  user: {
    type: String,
    required: true, //设定是否必填
  },
  currTestType: Number,
  state:Number,   //0:表示未开始考试,不显示  1:表示已开始考试,显示  2:表示已经考试结束
  testQuestion: {
    type: Number,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  startTime: Date,
  currAnswer: Array,
  currState: Array,
  error: Array,
  sorce: Number,
  startTestTime: Date,
  //startTimeHours:Number,
  //startTimeMinutes:Number,
  //startTimeSeconds:Number,
  testTimeMinutes:Number,
  testTimeSeconds:Number,
  isCheckNum:Number
});
