const express = require("express");
const { ObjectId } = require("mongodb");
const { Api, Error_Message } = require("../../services/constant");
const { db } = require("../../services/database");
const router = express.Router();
router.post(Api + "/setup-account", async (req, res) => {
  const preferences={'preferences':req.body}
  try {
    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(req.user._id) },
      {
        $set:preferences,
      },
      {
        returnDocument:true
      }
    );
    // const {password,...user}={...result.value,...preferences}
    res.send(preferences)
  } catch (error) {
    res.send(error+'');
  }
});

module.exports = router;
