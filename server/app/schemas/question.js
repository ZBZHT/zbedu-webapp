const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义question
module.exports = new Schema({
  num: {
    type: Number,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  desc: String,
  options: Array,
  value:Array,
  name:String,
  forId:Array,
  answer: String,
  type: String,
  genre: String,
  major: String,
  title1: String,
  title2: String,
  title3: String,
  title4: String,
  title5: String,
  title6: String,
});

