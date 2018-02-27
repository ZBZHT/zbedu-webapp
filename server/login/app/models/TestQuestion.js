const mongoose = require('mongoose');
const testQuestionSchema = require('../schemas/testQuestion');

module.exports = mongoose.model('TestQuestion',testQuestionSchema);
