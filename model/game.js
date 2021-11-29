'use strict';
const { DataTypes } = require('sequelize')
const { db } = require('../database/database');

var Game = db.define('Game', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.STRING,
    link: DataTypes.STRING
}, {
    classMethods: {
        associate: function (models) {
            models.Game.hasOne(models.Category);
            models.Game.belongsToMany(models.User);
        }
    }
});