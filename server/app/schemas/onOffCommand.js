var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema({
  time: String,
  name: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  children: Array
});
