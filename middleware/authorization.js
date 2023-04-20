const { ObjectId } = require("mongodb");
const { jwt } = require("../services/constant");
const { db } = require("../services/database");
function authorization(req, res, next) {
  const token =  req.cookies.token;
  //check if is token
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        res.status(401).json({ message: 'Session expired... Please login again' });
        return;
      }
  
      //check if current user exist
      const u=await db.collection('users').findOne({_id:new ObjectId(user.id)})
      if(!u)
      {
        res.status(401).json({ message: 'Unauthorized , User Not Found !!' });
        return
      }
      const {password,..._user}=u
      req.user = _user;
      next();
    });
  }

  module.exports=authorization