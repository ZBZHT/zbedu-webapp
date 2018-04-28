const mongoose = require('mongoose');
const centerTreeSchema = require('../schemas/centerTree');
module.exports = mongoose.model('CenterTree',centerTreeSchema);
