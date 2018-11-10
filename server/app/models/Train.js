let mongoose = require('mongoose');
let TrainSchema = require('../schemas/train');
module.exports = mongoose.model('Train',TrainSchema);
