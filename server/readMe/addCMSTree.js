//往数据库中添加CmsLabelTree记录
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const CmsLabelTree = require('../app/models/CmsLabelTree');
const CMSlabelTree1 = require('../app/mock/CMSlabelTree.json');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});

let p1 = new Promise((resolve, reject) => {
  CmsLabelTree.findOne({
    name: 'cmsLabelTree'
  }).then(function (result) {
    if (result === null || result.length === 0) {
      let cmsLabelTree = new CmsLabelTree({
        name: 'cmsLabelTree',
        date: new Date(),
        children: [],
      });
      cmsLabelTree.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('创建成功');
          resolve('创建成功')
        }
      });
    } else {
      resolve('已存在')
    }
  });
});

Promise.all([p1]).then((result) => {
  console.log(result);
  CmsLabelTree.findOneAndUpdate({
    name: 'cmsLabelTree'
  }, {
    date: new Date(),
    children: CMSlabelTree1,
  },function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('CmsLabelTree更新成功');
    }
  });
}).catch((error) => {
  console.log(error)
});
