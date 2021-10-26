// Imports
var express = require('express');
var usersCtrl = require('../controller/userController');

// Router
exports.router = (function () {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('../users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('../users/me/').put(usersCtrl.updateUserProfile);

    // Game routes
    // === TODO HERE === //

    return apiRouter;
})();