const mongoose = require('mongoose');
const questionSchema = require('../schemas/question');

module.exports = mongoose.model("Question", questionSchema);
