require('dotenv').config();
const express = require("express");
const { connect } = require('./services/database');
const server = express();
//connect to database
connect()
//add midleware
server.use(express.json())

//add routes
server.use(require('./controllers/auth/login'))
server.use(require('./controllers/users'))

server.listen(5000, () => {
  console.log("server start up");
});
