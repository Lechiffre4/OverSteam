var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* GET singin listing. */
router.get('/signin', function (req, res, next) {
    res.render('loginSystem/signin');
});

/* GET login listing. */
router.get('/login/', function (req, res, next) {
    res.render('loginSystem/login');
});

/* GET profile listing. */
router.get('/profile/', function (req, res, next) {
    res.render('profile');
});

/* GET about page*/
router.get('/about', function (req, res, next) {
    res.render('about');
})
/* GET home page. */
router.get('/home', function (req, res, next) {
    res.render('home');
});

module.exports = router;