const mongoose = require('mongoose');
const resourceCenterSchema = require('../schemas/resourceCenter');
module.exports = mongoose.model('ResourceCenter',resourceCenterSchema);
