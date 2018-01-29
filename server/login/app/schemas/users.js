var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema({
    user: String,
    pwd: String,
    admin: String,
    userID: String,
    IDNo: String,
    MoNo: String,
    userType: String
});
