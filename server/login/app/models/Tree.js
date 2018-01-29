var mongoose = require('mongoose');
var treesSchema = require('../schemas/Trees');
module.exports = mongoose.model('Tree',treesSchema);