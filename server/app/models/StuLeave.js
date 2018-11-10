let mongoose = require('mongoose');
let stuLeaveSchema = require('../schemas/stuLeave');
module.exports = mongoose.model('StuLeave',stuLeaveSchema);
