'use strict';
const { DataTypes } = require('sequelize')
const { db } = require('../database/database');

var Game = db.define('Game', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
}, {
    classMethods: {
        associate: function (models) {
            models.Game.hasMany(models.Category);
            models.Game.belongsToMany(models.User);
        }
    }
});