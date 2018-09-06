const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = new Schema({
  bestCourse: Array,
  suggCourse: Array,
  countForHot: Array,
  studentHot:Array,
});
