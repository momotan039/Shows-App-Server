const express=require('express')
const { ObjectId } = require('mongodb')
const { Api, Error_Message } = require('../../services/constant')
const { db } = require('../../services/database')
const router=express.Router()
router.post(Api+'/setup-account',async (req,res)=>{
    const {lang,show_lang,genres}=req.body
   try {
    await db.collection('users').updateOne({_id:new ObjectId(req.user.id)},{
        $set:{...req.body}
    })
   } catch (error) {
    res.send(Error_Message)
   }
})

module.exports=router