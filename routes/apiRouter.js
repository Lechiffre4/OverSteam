// Imports
var express = require('express');
var usersCtrl = require('../controller/userController');
var gameCtrl = require('../controller/gameController');
var categoryCtrl = require('../controller/categoryController');

// Router
exports.router = (function () {
    var apiRouter = express.Router();

    // Home route
    apiRouter.route('/').get(function (req, res) { return res.status(201).json({ message: 'Welcome to Oversteam API' }); });

    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/modify/').put(usersCtrl.updateUserProfile);
    apiRouter.route('/users/deletemygame').post(usersCtrl.deletemyGame);

    // Game routes
    apiRouter.route('/games/all').get(gameCtrl.getAllGames);
    apiRouter.route('/games/id').get(gameCtrl.getGameById);
    apiRouter.route('/games/addgame').post(gameCtrl.addGame);
    apiRouter.route('/games/category').get(gameCtrl.getGamesByCategory);
    apiRouter.route('/games/user').get(gameCtrl.getGamesByUser);
    apiRouter.route('/games/addtomygames').post(gameCtrl.addtoMyGames);
    apiRouter.route('/games/remove').post(gameCtrl.DeleteGameLib);

    // Category routes
    apiRouter.route('/categories/all').get(categoryCtrl.getAllCategories);

    return apiRouter;
})();