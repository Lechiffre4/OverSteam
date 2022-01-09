'use strict';
const { DataTypes } = require('sequelize')
const { db } = require('../database/database');

var Game = db.define('Game', {
	name: DataTypes.STRING,
	description: DataTypes.STRING,
	link: DataTypes.STRING,
});

module.exports = Game;