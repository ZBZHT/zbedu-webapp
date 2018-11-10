let mongoose = require('mongoose');
let OnOffCommandSchema = require('../schemas/onOffCommand');
module.exports = mongoose.model('OnOffCommand',OnOffCommandSchema);
