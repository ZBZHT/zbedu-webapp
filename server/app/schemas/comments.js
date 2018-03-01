const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义result
let resultSchema = new Schema({
  type: Number,
  num: Number,
  source: String,
  title: String,
  user: String,
  text: String,
  time: String,
  score: String,
  target: String,
  targetId: String
});
let Result = mongoose.model("Result", resultSchema);

//定义comments
module.exports = new Schema({
  status: String,
  msg: String,
  result: [resultSchema]
});

