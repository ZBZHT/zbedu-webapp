const mongoose = require('mongoose');
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
let commentsSchema = new mongoose.Schema({
  status : String,
  msg : Number,
  result : [studentSchema]
});
let Comments = mongoose.model("Comments",commentsSchema);
