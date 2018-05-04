const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema({
  user: {
    type: String,
    required: true, //设定是否必填
  },
  pwd: {
    type: String,
  },
  userID: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  IDNo: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
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
  gender: {
    type: Number,
    required: true, //设定是否必填
  },
  AdmDate: {  //入学时间
    type: Date,
    required: true, //设定是否必填
  },
  major: {  //专业
    type: String,
    required: true, //设定是否必填
  },
  avatar: String,  //头像
  classGrade: {  //班级
    type: String,
    required: true, //设定是否必填
  }
});
