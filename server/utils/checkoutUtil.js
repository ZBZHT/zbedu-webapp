var MongoDao = require('../dao/MongoDao');

module.exports = {
	sendPost : function(req, res, next) {
		//console.log(req.body);
		MongoDao.insertOrder(req, res, next);
		//res.json('success');
		//location.href = "user";
		res.redirect('/user');
	}
};