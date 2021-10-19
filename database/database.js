const express = require('express'),
	app = express(),
	mysql = require('mysql'), // import mysql module
	cors = require('cors'),
	bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// setup database
const DataBase = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
});

DataBase.sync({});

try {
	DataBase.authenticate();
	console.log('Connection has been established successfully.');
  } catch (error) {
	console.error('Unable to connect to the database:', error);
  }

exports.db = DataBase;
