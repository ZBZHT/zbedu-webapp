
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/comment');

const db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

//定义result
let resultSchema = new mongoose.Schema({
  type : Number,
  Id : Number,
  source : String,
  title : String,
  user : String,
  text : String,
  time : String,
  score : Number,
  target : String,
  targetId : Number
});
let Result = mongoose.model("Result",resultSchema);
//定义comments
let kechengSchema = new mongoose.Schema({
    status : Number,
    msg : String,
    result : [resultSchema]
});
let Kecheng = mongoose.model("Kecheng",kechengSchema);

//添加新comment
let jsj = new Kecheng({
  status: '0',
  msg: "comments data a success"
});
jsj.result.push({
  type:"1",
  Id:"1",
  source:"course",
  title:"动力电池系统故障检修",
  user:"橘子1",
  text:"不错，微课拍的很专业，也很详细",
  time:"2017-12-12 10:20:36",
  score:"2",
  target:"",
  targetId:""
});
jsj.save(function (err) {
  if (err) return handleError(err);
  console.log('Success!');
});
//班级
/*let schoolClassSchema = new mongoose.Schema({
    "name" : String,
    "info" : String,
    "schoolClass" : [kechengSchema]
});
let schoolClass = mongoose.model("schoolClass",schoolClassSchema);*/


/*//实例方法，涨一岁
studentSchema.methods.zhangyisui = function(){
    this.age++;
    this.save();
};
//添加学生
kechengSchema.methods.tianjiaxuesheng = function(studentObj,callback){
    this.student[1].push(studentObj);
    this.save(function(){
        callback();
    });
};
//找学生
kechengSchema.methods.zhaoxuesheng = function(num,callback){

    Student.findOne({"name":this.student[num].name},function(err,result){
        callback(err,result);
    });
};*/

/*Kecheng.update({name:"计算机"}, {$push: {student:{
        name:"小了",
        age:"21",
        sex:"女"
      }}},{upsert:true},
  function (err) {
    if(err){
      console.log(err);
    }
  });*/


//实例化几个学生
  /*let xiaoming = new Student({"name": "小张", "age": 15, "sex": "男"});
//xiaoming.save();
  let jsj = new Kecheng({
    "name": "数据",
    "info": "数据库"
  });

  jsj.zhaoxuesheng(xiaoming, function () {
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
/*Kecheng.findOne({"name":"数学课"},function(err,kecheng){
    Kecheng.zhaoxuesheng(0,function(err,result){
        console.log(result);
    });
});*/

