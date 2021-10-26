var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET singin listing. */
router.get('/signin', function (req, res, next) {
    res.render('loginSystem/signin', { title: 'Express' });
});

/* GET login listing. */
router.get('/login/', function (req, res, next) {
    res.render('loginSystem/login', { title: 'Express' });
});

module.exports = router;