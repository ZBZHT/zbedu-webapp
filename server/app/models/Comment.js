const mongoose = require('mongoose');
const commentsSchema = require('../schemas/comment');

module.exports = mongoose.model("Comments",commentsSchema);
