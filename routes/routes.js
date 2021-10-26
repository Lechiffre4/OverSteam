var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;


/* GET user/singin listing. */
router.get('/user/signin', function (req, res, next) {

});

module.exports = router;


/* GET users/login listing. */
router.get('/user/login/', function (req, res, next) {

});

module.exports = router;