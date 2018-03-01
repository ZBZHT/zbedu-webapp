const mongoose = require('mongoose');
const testQuestionInfoSchema = require('../schemas/testQuestionInfo');

module.exports = mongoose.model("TestQuestionInfo", testQuestionInfoSchema);
