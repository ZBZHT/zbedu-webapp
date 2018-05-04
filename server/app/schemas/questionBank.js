const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义question
module.exports = new Schema({
  num: {
    type: Number,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  genre: String,
  major: String,
  title1: String,
  title2: String,
  title3: String,
  title4: String,
  title5: String,
  title6: String,
  children: [{
    desc: String,
    answer: String,
    type: String,
    forId:Array,
    value:Array,
    options: Array,
  }],
});

