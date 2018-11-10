const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema({
    courseName: String,
    courseDate: String,
    className: String,
    teacher: String,
    startTime: String,
    endTime: String,
    stateList: Array,
});
