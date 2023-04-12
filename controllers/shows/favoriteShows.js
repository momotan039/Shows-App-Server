const { ObjectId } = require("mongodb")
const { Api } = require("../../services/constant")
const { db } = require("../../services/database")
const express=require('express')
const router=express.Router()

router.get(Api+'/shows/favorite',async(req,res)=>{
    const shows= await db.collection('favorite_shows').find({user_id:req.user._id}).toArray()
    res.send(shows)
})
router.delete(Api+'/shows/favorite/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        console.log(id);
        // Find the show by user id and show id
        const show = await db.collection('favorite_shows').deleteOne({_id:new ObjectId(id)});
        console.log(show);
        if (!show) {
          return res.status(404).json({ message: 'Show not found' });
        }
        return res.json({ message: 'Show deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
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