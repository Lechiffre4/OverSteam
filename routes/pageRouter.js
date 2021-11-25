var express = require('express');
const { checktoken } = require('../utils');
var router = express.Router();
var utils = require('../utils')
var bcrypt = require('bcrypt');
var userController = require('../controller/userController')

//////////////Functions//////////////////
//function Middleware
function auth(req, res, next) {
    var cookie = getcookie(req);
    if (cookie == null)
        next();
    try {
        var token = cookie[1];
        const decoded = checktoken(token);
        if (decoded != null)
        {
            res.redirect('/home');
        }
        else
            next();
        
    }
    catch (ex) {
        console.log(ex.message);
        next();
    }
}

function getcookie(req) {
    var cookie = req.headers.cookie;
    if (cookie == undefined || cookie == null) {
        return null;
    }
    else {
        cookie = cookie.split('=');
        return cookie;
    }
}

/////////////////////////////////////////


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

/* GET shop page. */
router.get('/shop', function (req, res, next) {
    res.render('shop');
});

module.exports = router;