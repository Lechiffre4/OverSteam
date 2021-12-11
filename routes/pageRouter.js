var express = require('express');
const { checktoken } = require('../utils');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var userController = require('../controller/userController')
require('dotenv').config();

//////////////Functions//////////////////
//function Middleware
function auth(req, res, next) {
    var cookie = getcookie(req);
    if (cookie == null)
        next();
    try {
        var token = cookie[1];
        const decoded = checktoken(token);
        if (decoded != null) {

        }
        else
            next();

    }
    catch (ex) {
        next();
    }
}

function getcookie(req) {
    var cookie = req.headers.cookie;
    if (cookie == undefined || cookie == null) {
        return null;
    }
    else {
        cookie = cookie.split('=')[1];
        return cookie;
    }
}

function CookieExist(req, res, next) {
    var cookie = getcookie(req);
    if (cookie)
        next()
    else
        res.redirect('/login');
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

/* GET modify listing. */
router.get('/profile/modify/', function (req, res, next) {
    res.render('loginSystem/modify');
});

/* GET profile listing. */
router.get('/profile/', CookieExist, function (req, res, next) {
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

/* GET add game page. */
router.get('/addgame', CookieExist, function (req, res, next) {
    res.render('addgame');
});

/* GET add game page. */
router.get('/mygames', CookieExist, function (req, res, next) {
    res.render('mygames');
});

/* GET add game page. */
router.get('/game', CookieExist, function (req, res, next) {
    res.render('game');
});

module.exports = router;