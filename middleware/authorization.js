const { jwt } = require("../services/constant");
function authorization(req, res, next) {
  const token =  req.cookies.token;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
   
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Session expired... Please login again' });
        return;
      }
  
      req.user = decoded;
      next();
    });
  }

  module.exports=authorization