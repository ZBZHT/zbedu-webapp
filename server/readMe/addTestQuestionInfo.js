//往数据库中添加comments记录
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/db');

const db = mongoose.connection;
db.once('open', function (callback) {
  console.log("数据库成功打开");
});

//定义testQuestionInfo
let testQuestionInfoSchema = new mongoose.Schema({
  user: String,
  currTestId: Number,
  testQuestion: Number,
  startTime: Date,
  state:Number,
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
let TestQuestionInfo = mongoose.model("TestQuestionInfo", testQuestionInfoSchema);

//添加新comment
let testQuestionInfo = new TestQuestionInfo({
  user: '谢佳芯',
  currTestId: '101',
  testQuestion: 5,
  state: 0,
  startTime: '',
  currAnswer: '',
  currState: '',
  error: '',
  sorce: 2,
  startTimeHours: 0,
  startTimeMinutes: 0,
  startTimeSeconds: 0,
  testTimeMinutes: 0,
  testTimeSeconds: 0,
  isCheckNum: 0
});
//testQuestionInfo.push();
testQuestionInfo.save(function (err) {
  if (err) return handleError(err);
  console.log('Success!');
});

