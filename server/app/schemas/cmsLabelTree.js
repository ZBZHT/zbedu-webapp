const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema({
    name: String,
    date: Date,
    children: Array,
});
