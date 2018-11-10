let mongoose = require('mongoose');
let courseTableSchema = require('../schemas/courseTable');
module.exports = mongoose.model('CourseTable',courseTableSchema);
