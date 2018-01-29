var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('home1',{title: 'home1'});
});

module.exports = router;
