var mongoose = require('mongoose');
var usersSchema = require('../schemas/jsons');
module.exports = mongoose.model('Json',usersSchema);