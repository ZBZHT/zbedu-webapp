let mongoose = require('mongoose');
let cmsLabelTreeSchema = require('../schemas/cmsLabelTree');
module.exports = mongoose.model('CmsLabelTree',cmsLabelTreeSchema);
