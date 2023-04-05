require('dotenv').config();
const express = require("express");
const server = express();
const authorization = require('./middleware/authorization');
const { Api } = require('./services/constant');
const { connect } = require('./services/database');
const cookieParser = require("cookie-parser");
const { getAllGenres } = require('./services/showsAPI');
//connect to database
connect()
//add midleware
server.use(cookieParser())
server.use(Api,(req,res,next)=>authorization(req,res,next))
server.use(express.json())
//add routes
server.use(require('./controllers/auth/login'))
server.use(require('./controllers/auth/register'))
server.use(require('./controllers/user/users'))
server.use(require('./controllers/user/preferences'))

server.listen(5000, () => {
  console.log("server start up");
});
