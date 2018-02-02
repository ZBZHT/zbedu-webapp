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
    user: '徐瑞',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13000000001',
    userType: 'T'
});
var bbb = new users({
    user: '谢佳芯',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000002',
    IDNo: '410521000000000002',
    MoNo: '13000000002',
    userType: 'S'
});
var ccc = new users({
    user: '路晓东',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000003',
    IDNo: '410521000000000003',
    MoNo: '13000000003',
    userType: 'S'
});
var ddd = new users({
    user: '东阳',
    pwd: '698d51a19d8a121ce581499d7b701668',
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
