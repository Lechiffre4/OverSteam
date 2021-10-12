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

// make server object that contain port property and the value for our server.
var server = {
  port: 3306
};

// use the modules
app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'));

// starting the server

app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));

// Database connection test
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

