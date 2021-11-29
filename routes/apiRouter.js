// Imports
var express = require('express');
var usersCtrl = require('../controller/userController');
var gameCtrl = require('../controller/gameController');

// Router
exports.router = (function () {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/modify/').put(usersCtrl.updateUserProfile);

    // Game routes
    // === TODO HERE === //
    apiRouter.route('/games/all').get(gameCtrl.getAllGames);
    apiRouter.route('/games/addgame').post(gameCtrl.addGame);
    //gameCtrl.route('/games/category').get(gameCtrl.getGamesByCategory);
    //gameCtrl.route('/games/user').get(gameCtrl.getGamesByUser);

    return apiRouter;
})();