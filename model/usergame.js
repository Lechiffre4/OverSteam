'use strict';
const { DataTypes } = require('sequelize')
const { db } = require('../database/database');

var User_Game = db.define('User_Game', {
	UserId: DataTypes.NUMBER,
    GameId: DataTypes.NUMBER    

});

module.exports = User_Game;