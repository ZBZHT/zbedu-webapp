const mongoose = require('mongoose');
const questionSchema = require('../schemas/testQuestionSingle');

module.exports = mongoose.model("Question", questionSchema);
