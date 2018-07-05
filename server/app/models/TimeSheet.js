let mongoose = require('mongoose');
let timeSheetSchema = require('../schemas/timeSheet');
module.exports = mongoose.model('TimeSheet',timeSheetSchema);
