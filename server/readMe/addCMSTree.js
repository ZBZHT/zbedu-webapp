//往数据库中添加comments记录
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const CmsLabelTree = require('../app/models/CmsLabelTree');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});

//实例化
let cmsLabelTree = new CmsLabelTree(
  {
    name: 'cmsLabelTree',
    date: new Date(),
    children: [
      {
        "id": 200,
        "label": "个人中心",
        "children": [
          {
            "id": 201,
            "label": "我的信息"
          },
          {
            "id": 202,
            "label": "我的足迹"
          }
        ]
      },
      {
        "id": 100,
        "label": "数据管理",
        "children": [
          {
            "id": 101,
            "label": "用户管理"
          },
          {
            "id": 102,
            "label": "题库管理"
          }
        ]
      },
      {
        "id": 300,
        "label": "课程管理",
        "children": [
          {
            "id": 302,
            "label": "课程设置"
          },
          {
            "id": 301,
            "label": "我的课程"
          }
        ]
      },
      {
        "id": 400,
        "label": "考试管理",
        "children": [
          {
            "id": 401,
            "label": "我的考试"
          }
        ]
      }
    ],
  }
);
cmsLabelTree.save();
