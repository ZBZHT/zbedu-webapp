const express = require('express');
const router = express.Router();
const Student = require('../app/models/Student');

//方法
/*One.methods.pinglun = function (ojb, collback) {
    this.comments.push(ojb);
    this.save();
};*/
/*let one =new One({
    title:  '1',
    author: 'pinglun',
   /!* body:   'ziduan',
    comments: [{ body: '评论', date: new Date()}],
    date: { type: '2', default: Date.now },
    meta: {
        votes: '12',
        favs:  '4'
    }*!/
});*/
//实例化几个学生
var user = new Student({"name":"小明","age":12,"sex":"男"});
user.save();
xiaoming.save(function (err, xiaoming) {
    if (err) return console.error(err);
    xiaoming.speak();
});

//one.pinglun({ body: '评论内容', date: new Date()});
//查询
/*One.findOne({
    title: '1'
}).then(function (data) {
    console.log(data);
});*/

module.exports = router;
