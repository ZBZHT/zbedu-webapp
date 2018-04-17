const mongoose = require('mongoose');
const techCosCouSchema = require('../schemas/techCosCou');
module.exports = mongoose.model('TechCosCou',techCosCouSchema);
