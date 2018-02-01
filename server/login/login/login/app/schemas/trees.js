var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema({
    name: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Node'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Node'
    }],
    ancestors: [{
        type: Schema.Types.ObjectId,
        ref: 'Node'
    }]
});
