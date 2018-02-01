const mongoose = require('mongoose');
const onesSchema = require('../schemas/Ones');
module.exports = mongoose.model('One',onesSchema);