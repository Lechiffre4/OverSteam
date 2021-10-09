const express = require('express'),
app = express(),
mysql = require('mysql'), // import mysql module
cors = require('cors'),
bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
  
  // setup database
  const sequelize = new Sequelize('bx6qovbae9nvqwc7mgin', 'uwjczwexdiyvjsop', 'vwfu8JeC2LLuvqlRAAHI', {
    host: 'bx6qovbae9nvqwc7mgin-mysql.services.clever-cloud.com',
    dialect: 'mysql',
  });

/*db = mysql.createConnection({
    host: 'bx6qovbae9nvqwc7mgin-mysql.services.clever-cloud.com',
    user: 'root',
    password: 'vwfu8JeC2LLuvqlRAAHI',
    database: 'bx6qovbae9nvqwc7mgin'
  })*/

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


try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

