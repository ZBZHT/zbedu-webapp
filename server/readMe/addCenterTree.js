//往数据库中添加comments记录
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const CenterTree = require('../app/models/CenterTree');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});

//实例化
let centerTree = new CenterTree(
  {
    name: 'centerTree',
    newTime: new Date(),
    children: [],
  }
);
centerTree.save();

