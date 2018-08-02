const mongoose = require('mongoose');
const setCourseSchema = require('../schemas/setCourse');
module.exports = mongoose.model('SetCourse',setCourseSchema);
