const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义result
module.exports = new Schema({
  title: {
    type: Array,
    required: true, //设定是否必填
  },
  appraiseMsg: {
    type: Array,
  }
});

