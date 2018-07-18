//往数据库中添加comments记录
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const Comment = require('../app/models/Comment');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});

//添加新comment
let comment = new Comment({
  title: [
    '新能源汽车', '纯电动汽车', '动力电池系统检修', 'BMS系统拆装'
  ],
  appraiseMsg: [],
});
comment.save(function (err) {
  if (err) return handleError(err);
  console.log('Success!');
});

