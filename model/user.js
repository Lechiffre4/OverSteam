'use strict';
const {DataTypes} = require('sequelize')
const {db} = require('../database/database');

var User = db.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
}, {
    classMethods: {
        associate: function (models) {
            // associations can be defined here
            models.User.hasMany(models.Message);
        }
    }
});

console.log(User === db.models.User); 