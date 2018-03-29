const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义question
module.exports = new Schema({
  id: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  user: String,
  theme: String,
  name: Array,
  nameId: Array,
  currTestType: Number,
  date1: Date,
  date2: Date,
  date3: String,
  date4: String,
  num: Number,
  timeHour: String,
  timeMin: String,
  major: String,
  classGrade: Number,
  newData: Date
});

