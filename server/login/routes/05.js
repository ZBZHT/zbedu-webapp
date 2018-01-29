/**
 * Created by Danny on 2015/9/29 10:18.
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/xuanke');

const db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});


//学生
let studentSchema = new mongoose.Schema({
    "name" : String,
    "age" : Number,
    "sex" : String
});
let Student = mongoose.model("Student",studentSchema);
//课程
let kechengSchema = new mongoose.Schema({
    "name" : String,
    "info" : String,
    "student" : [studentSchema]
});
let Kecheng = mongoose.model("Kecheng",kechengSchema);
//班级
let schoolClass = new mongoose.Schema({
    "name" : String,
    "info" : String,
    "schoolClass" : [kechengSchema]
});



//实例方法，涨一岁
studentSchema.methods.zhangyisui = function(){
    this.age++;
    this.save();
};
//添加学生
kechengSchema.methods.tianjiaxuesheng = function(studentObj,callback){
    this.student.push(studentObj);
    this.save(function(){
        callback();
    });
};
//找学生
kechengSchema.methods.zhaoxuesheng = function(num,callback){

    Student.findOne({"name":this.student[num].name},function(err,result){
        callback(err,result);
    });
};


//实例化几个学生
/*var xiaoming = new Student({"name":"小白","age":20,"sex":"男"});
xiaoming.save();

var shuxue = new Kecheng({
    "name" : "计算机",
    "info" : "计算机管理"
});

shuxue.tianjiaxuesheng(xiaoming,function(){
    console.log("添加成功");
});*/

//寻找学生小黑
/*Student.findOne({"name":"小黑"},function(err,student){
    student.zhangyisui();
});*/
/*Kecheng.findOne({"name":"小黑"},function(err,student){
    student.zhangyisui();
});*/

//////通过课程找学生
Kecheng.findOne({"name":"数学课"},function(err,kecheng){
    Kecheng.zhaoxuesheng(0,function(err,result){
        console.log(result);
    });
});

