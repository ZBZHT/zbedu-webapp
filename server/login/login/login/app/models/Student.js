const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//学生
var studentSchema = new Schema({
    "name" : String,
    "age" : Number,
    "sex" : String
});
//课程。
var kechengSchema = new Schema({
    "name" : String,
    "info" : String,
    "student" : [studentSchema]
});

module.exports = mongoose.model("Kecheng",kechengSchema);
module.exports = mongoose.model("Student",studentSchema);