// Imports
var express = require('express');
var usersCtrl = require('../controller/userController');
var gameCtrl = require('../controller/gameController');
var categoryCtrl = require('../controller/categoryController');

// Router
exports.router = (function () {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/modify/').put(usersCtrl.updateUserProfile);
    apiRouter.route('/users/mygames').get(usersCtrl.getMyGames);
    apiRouter.route('/users/deletemygame').post(usersCtrl.deletemyGame);

    // Game routes
    apiRouter.route('/games/all').get(gameCtrl.getAllGames);
    apiRouter.route('/games/addgame').post(gameCtrl.addGame);
    apiRouter.route('/games/category').get(gameCtrl.getGamesByCategory);
    apiRouter.route('/games/user').get(gameCtrl.getGamesByUser);
    apiRouter.route('/games/addtomygames').post(gameCtrl.addtoMyGames);

    // Category routes
    apiRouter.route('/categories/all').get(categoryCtrl.getAllCategories);

    return apiRouter;
})();