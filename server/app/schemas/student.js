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
  },
  userType: {
    type: String,
    required: true, //设定是否必填
  },
  gender: Number,
  time: Date,       //入学时间
  major: String,    //专业
  avatar: String,   //头像
  classGrade: String, //班级
  department: String,  //院系
  email: String,
  clickNum:Number, //用户点击数
  myFootprint:Array,
});
