const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { db } = require("../../services/database");
const { jwt } = require("../../services/constant");
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Verify password
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate and return an access token
    const token = jwt.sign(
      { email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    console.log(req.hostname);
    //save the token in cookie
    res.cookie("token", token, { httpOnly: true , domain:req.hostname });

    //copeied user without password
    const { password: pass, ...copy_user } = user;
    
    //get user shows lists
    const favorite= await db.collection('favorite_shows').find({user_id:user._id}).toArray()
    const viewed= await db.collection('viewd_shows').find({user_id:user._id}).toArray()
    const watchLater= await db.collection('watch_later_shows').find({user_id:user._id}).toArray()
    
    res.json({user:{...copy_user,favorite,viewed,watchLater}});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
