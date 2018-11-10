//添加公司内部用户信息
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const Teacher = require('../app/models/Teacher');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});

//实例化几个学生
let a = new Teacher({
  user: '路晓东',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000001',
  IDNo: '410521000000000001',
  MoNo: '18537228775',
  userType: 'SA',
  gender: 1,
  AdmDate: new Date(),
});


a.save();
