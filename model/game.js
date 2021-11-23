'use strict';
const { DataTypes } = require('sequelize')
const { db } = require('../database/database');

var Game = db.define('Game', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.STRING,
    date: DataTypes.DATE,
}, {
    classMethods: {
        associate: function (models) {
            // associations can be defined here
            models.User.hasMany(models.Category);
        }
    }
});