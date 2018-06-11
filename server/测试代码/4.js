/**
 * Created by Administrator on 2018/5/13.
 */
const Promise = require('bluebird');
mongoose.Promise = require('bluebird');
const TestQuestionInfo = require('../app/models/TestQuestionInfo');
const Question = require('../app/models/Question');
let data = [100,200,300];
/*let qq = Question.find({num: {"$in": data}});
qq.then(function (doc) {
  console.log(doc);
});*/
var promise = Question.find({num: {"$in": data}}).exec();
promise.then(
  function(result) {
    console.log(result);
  },
  function(err) {
    // on reject
  }
);
/*Promise.all(data.map((item, index) => Question.find({num: {"$in": item}}))).then(res => {
  console.log(res);
});*/
