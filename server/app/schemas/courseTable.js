const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema(
  {
    createDate: String,
    courseDate: String,
    createName: String,
    className: String,
    teachList: Array,
    course: Array,
  },
);
