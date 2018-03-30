const mongoose = require('mongoose');
const teacherSchema = require('../schemas/teacher');
module.exports = mongoose.model('Teacher',teacherSchema);
