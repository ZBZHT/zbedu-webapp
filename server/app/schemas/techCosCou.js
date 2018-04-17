const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema({
  userID: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  newTime: {  //创建时间
    type: Date,
    required: true, //设定是否必填
  },
  tab:Array,  //课程列表
});
