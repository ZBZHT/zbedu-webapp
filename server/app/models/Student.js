const mongoose = require('mongoose');
const studentSchema = require('../schemas/student');
module.exports = mongoose.model('Student',studentSchema);
