const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema(
  {
    id: Number,
    label: String,
    children: [
      {
        id: Number,
        label: String
      },
      {
        id: Number,
        label: String
      },
      {
        id: Number,
        label: String
      },
      {
        id: Number,
        label: String
      },
      {
        id: Number,
        label: String
      },
    ],
  },
  {
    id: Number,
    label: String,
    children:[
      {
        id: Number,
        label:String
      },
      {
        id: Number,
        label:String
      }
    ]
  },
  {
    id: Number,
    label: String,
    children:[
      {
        id: Number,
        label:String
      },
      {
        id: Number,
        label:String
      }
    ]
  }
);
