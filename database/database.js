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

// Database connection test
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}