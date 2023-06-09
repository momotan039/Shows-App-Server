require('dotenv').config();
const express = require("express");
const server = express();
const cors=require('cors')
const authorization = require('./middleware/authorization');
const { Api } = require('./services/constant');
const { connect } = require('./services/database');
const cookieParser = require("cookie-parser");
//connect to database
connect()

//add midleware
server.use(cookieParser())
server.use(cors({
  credentials:true,
  origin:'https://recommended-shows-mt.netlify.app'
}))
server.use(Api,(req,res,next)=>authorization(req,res,next))
server.use(express.json())
server.use(express.query())

//add routes
server.use(require('./controllers/auth/login'))
server.use(require('./controllers/auth/register'))
server.use(require('./controllers/user/users'))
server.use(require('./controllers/user/setupAccount'))
server.use(require('./controllers/shows/favoriteShows'))
server.use(require('./controllers/shows/viewdShows'))
server.use(require('./controllers/shows/watchLaterShows'))
server.use(require('./controllers/shows/shows'))

server.listen(5000, () => {
  console.log("server start up");
});
