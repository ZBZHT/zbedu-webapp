const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('../schemas/testQuestionSingle');

//定义testQuestion
module.exports = new Schema({
  status: Number,
  user: String,
  msg: String,
  testId: Number,
  state:Number,   //0:表示未开始不显示  1:表示已开始显示  2:表示已经考试结束
  currTestNum:{ type: Number, unique: true, },
  currTestType: Number,
  title: String,
  desc: String,
  question: [Question]
});

