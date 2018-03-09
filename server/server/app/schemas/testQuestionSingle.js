const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义question
module.exports = new Schema({
  num: Number,
  desc: String,
  options: Array,
  value:Array,
  name:String,
  forId:Array,
  answer: String,
  type: String
});

