var mongoose = require('mongoose');
var usersSchema = require('../schemas/session');
module.exports = mongoose.model('Session',usersSchema);