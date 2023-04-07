const { ObjectId } = require("mongodb")
const { Api } = require("../../services/constant")
const { db } = require("../../services/database")
const express=require('express')
const router=express.Router()

router.get(Api+'/shows/favorite',async(req,res)=>{
    const shows= await db.collection('favorite_shows').find({user_id:req.user._id}).toArray()
    res.send(shows)
})

router.post(Api+'/shows/favorite',(req,res)=>{
    const {user_id,...data}=req.body
    const favorite={...data,user_id:new ObjectId(user_id)}
    db.collection('favorite_shows').insertOne(favorite)
    .then((data)=>{
        res.send('This show add successfuly to favorite shows list')
    }).catch((err)=>res.send(err+''))
})
module.exports=router