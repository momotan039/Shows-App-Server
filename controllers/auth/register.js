const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt');
const { db } = require('../../services/database');
router.post('/register', async (req, res) => {
    try {
      const { email, password, username } = req.body;
  
      // Check if user already exists
      const userExists = await db.collection('users').findOne({ email });
      if (userExists) {
        res.status(409).json({ message: 'User already exists' });
        return;
      }
  
      // Create a new user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = {
        email,
        password: hash,
        username,
        role: 'user'
      };
      await db.collection('users').insertOne(newUser);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports=router