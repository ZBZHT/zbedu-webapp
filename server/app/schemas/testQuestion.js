const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义question
let questionSchema = new Schema({
  num: Number,
  desc: String,
  options: Array,
  value:Array,
  name:String,
  forId:Array,
  answer: String,
  type: String
});
let Question = mongoose.model("Question", questionSchema);

//定义testQuestion
module.exports = new Schema({
  status: Number,
  user: String,
  msg: String,
  testId: Number,
  state:Number,   //0:表示未开始不显示  1:表示已开始显示  2:表示已经考试结束
  currTestNum:Number,
  title: String,
  desc: String,
  question: [questionSchema]
});

