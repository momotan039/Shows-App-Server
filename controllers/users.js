const express=require('express')
const router=express.Router()
const {db} = require("../services/database");
router.get(process.env.API+'/users',async(req,res)=>{
const users=await db.collection('users').find({}).toArray()
res.send(users)
})
module.exports=router