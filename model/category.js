'use strict';
const { DataTypes } = require('sequelize')
const { db } = require('../database/database');

var Category = db.define('Category', {
    name: DataTypes.STRING,
}, {
    classMethods: {
        associate: function (models) {
            models.Category.belongsToMany(models.Game);
        }
    }
});