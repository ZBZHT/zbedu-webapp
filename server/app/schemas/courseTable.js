const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema(
  {
    createDate: String,
    courseDate: {
      type: String,
      unique: true,  //索引值唯一
      required: true, //设定是否必填
    },
    createName: String,
    className: String,
    teachList: Array,
    course: Array,
  },
);
