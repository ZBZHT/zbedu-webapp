const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/db');

const db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

//学生模型
let studentSchema = new mongoose.Schema({
    user: String,
    pwd: String,
    admin: String,
    userID: String,
    IDNo: String,
    MoNo: String,
    userType: String
});
let users = mongoose.model("users",studentSchema);

//实例化几个学生
var aaa = new users({
    user: 'aaa',
    pwd: '111',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13000000001',
    userType: 'T'
});
var bbb = new users({
    user: 'bbb',
    pwd: '111',
    admin: false,
    userID: '00000002',
    IDNo: '410521000000000002',
    MoNo: '13000000002',
    userType: 'S'
});
var ccc = new users({
    user: 'ccc',
    pwd: '111',
    admin: false,
    userID: '00000003',
    IDNo: '410521000000000003',
    MoNo: '13000000003',
    userType: 'S'
});
var ddd = new users({
    user: 'ddd',
    pwd: '111',
    admin: false,
    userID: '00000004',
    IDNo: '410521000000000004',
    MoNo: '13000000004',
    userType: 'O'
});
aaa.save();
bbb.save();
ccc.save();
ddd.save();
