const mongoose = require('mongoose');
const teachNewTestQSchema = require('../schemas/teachNewTestQ');

module.exports = mongoose.model("TeachNewTestQ", teachNewTestQSchema);
