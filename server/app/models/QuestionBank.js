const mongoose = require('mongoose');
const questionBankSchema = require('../schemas/questionBank');

module.exports = mongoose.model("QuestionBank", questionBankSchema);
