const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema({
  name: String,
  newTime: Date,
  children: Array,
});
