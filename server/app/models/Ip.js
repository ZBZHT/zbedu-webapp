let mongoose = require('mongoose');
let IpSchema = require('../schemas/ip');
module.exports = mongoose.model('Ip',IpSchema);
