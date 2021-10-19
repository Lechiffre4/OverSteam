const express = require('express'),
	app = express(),
	mysql = require('mysql'), // import mysql module
	cors = require('cors'),
	bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

// setup database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
});

exports.db = sequelize;
