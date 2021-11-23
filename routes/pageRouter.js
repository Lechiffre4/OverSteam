var express = require('express');
var router = express.Router();

//////////////Functions//////////////////
//function Middleware
function auth(req,res,next)
{
    var cookie = getcookie(req);
    console.log(cookie[1]);
    if (cookie == null)
        next();
    
    console.log("already connected");
    //Redirection si deja log
    res.redirect("/home")
      
}

function getcookie(req) {
    var cookie = req.headers.cookie;
    cookie = cookie.split('=');
    if(cookie == null)
    {
      return null;
    }
    return cookie;
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
router.get('/login/',auth, function (req, res, next) {
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