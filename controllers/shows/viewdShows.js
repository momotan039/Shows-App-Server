const { ObjectId } = require("mongodb")
const { Api } = require("../../services/constant")
const { db } = require("../../services/database")
const express=require('express')
const router=express.Router()

router.get(Api+'/shows/viewd',async(req,res)=>{
    const shows= await db.collection('viewd_shows').find({user_id:req.user._id}).toArray()
    res.send(shows)
})

router.post(Api+'/shows/viewd',(req,res)=>{
    const {user_id,...data}=req.body
    const viewd={...data,user_id:new ObjectId(user_id)}
    db.collection('viewd_shows').insertOne(viewd)
    .then((data)=>{
        res.send('This show add successfuly to viewd shows list')
    }).catch((err)=>res.send(err+''))
})


module.exports=router