const { ObjectId } = require("mongodb")
const { Api } = require("../../services/constant")
const { db } = require("../../services/database")
const express=require('express')
const router=express.Router()

router.get(Api+'/shows/watch-later',async(req,res)=>{
    const shows= await db.collection('watch_later_shows').find({user_id:req.user._id}).toArray()
    res.send(shows)
})

router.post(Api+'/shows/watch-later',(req,res)=>{
    const {user_id,...data}=req.body
    const viewd={...data,user_id:new ObjectId(user_id)}
    db.collection('watch_later_shows').insertOne(viewd)
    .then((data)=>{
        res.send('This show add successfuly to watch later shows list')
    }).catch((err)=>res.send(err+''))
})

module.exports=router