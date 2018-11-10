const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema({
    startDate: String,
    endDate: String,
    startTime: String,
    endTime: String,
    stuName: String,
    className: String,
    reason: String,
    state: Number
});
