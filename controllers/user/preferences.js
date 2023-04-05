const express = require("express");
const { ObjectId } = require("mongodb");
const { Api, Error_Message } = require("../../services/constant");
const { db } = require("../../services/database");
const router = express.Router();
router.post(Api + "/setup-account", async (req, res) => {
  const { lang, show_lang, genres } = req.body;
  try {
    const f='642d7ff2af1a56c5cd55a0e4'
    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(f) },
      {
        $set:req.body,
      },
      {
        returnDocument:true
      }
    );
    const {password,...user}=result.value
    res.send(user)
  } catch (error) {
    res.send(Error_Message);
  }
});

module.exports = router;
