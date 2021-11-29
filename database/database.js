const express = require('express'),
	app = express(),
	mysql = require('mysql'), // import mysql module
	cors = require('cors'),
	bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
var fs = require('fs');
var path = require('path');
var basename = path.resolve(__dirname, '../model/')
var db = {};
require('dotenv').config();

// setup database
const DataBase = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
});

// Assocate models
console.log(basename);
fs
	.readdirSync(basename)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		console.log(file);
		const model = require(path.join(basename, file))(DataBase, Sequelize);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

DataBase.sync({});

exports.db = DataBase;
