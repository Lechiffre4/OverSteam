const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser');


    const express = require('express'),
    app = express(),
    mysql = require('mysql'), // import mysql module
    cors = require('cors'),
    bodyParser = require('body-parser');
  
  // setup database
db = mysql.createConnection({
    host: 'bx6qovbae9nvqwc7mgin-mysql.services.clever-cloud.com',
    user: 'root',
    password: 'vwfu8JeC2LLuvqlRAAHI',
    database: 'bx6qovbae9nvqwc7mgin'
  })

// make server object that contain port property and the value for our server.
var server = {
    port: 4040
};

// use the modules
app.use(cors())
app.use(bodyParser.json());

// starting the server
app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));