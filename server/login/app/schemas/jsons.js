var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//用户表结构
module.exports = new Schema(
    {
    title: String,
    content: String,
    summary: String,
    categories: [{
        type: Schema.ObjectId,
        ref: 'Category' }],
    created: {  type: Date, default: Date.now}
}
);
