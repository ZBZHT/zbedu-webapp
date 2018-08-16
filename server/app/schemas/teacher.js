const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema({
  user: {
    type: String,
    required: true, //设定是否必填
  },
  pwd: String,
  userID: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  IDNo: {
    type: String,
    unique: true,  //索引值唯一
  },
  MoNo: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  userType: {
    type: String,
    required: true, //设定是否必填
  },
  gender: Number,
  time: Date,
  avatar: String,  //头像
  myFootprint:Array,
});
