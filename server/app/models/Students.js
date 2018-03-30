const mongoose = require('mongoose');
const studentsSchema = require('../schemas/students');
module.exports = mongoose.model('Students',studentsSchema);
