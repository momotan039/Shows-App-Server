function authorization(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
      req.user = decoded;
      next();
    });
  }

  module.exports=authorization