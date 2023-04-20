const { ObjectId } = require("mongodb")
const { Api } = require("../../services/constant")
const { db } = require("../../services/database")
const express=require('express')
const router=express.Router()

router.get(Api+'/shows/viewd',async(req,res)=>{
    const shows= await db.collection('viewd_shows').find({user_id:req.user._id}).toArray()
    res.send(shows)
})
router.delete(Api+'/shows/viewd/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        // Find the show by user id and show id
        const show = await db.collection('viewd_shows').deleteOne({user_id:req.user._id,id:parseInt(id)});
        if (!show) {
          return res.status(404).json({ message: 'Show not found' });
        }
        return res.json({ message: 'Show deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
})

router.post(Api+'/shows/viewd',(req,res)=>{
    const {user_id,...data}=req.body
    const viewd={...data,user_id:new ObjectId(req.user._id)}
    db.collection('viewd_shows').insertOne(viewd)
    .then((data)=>{
        res.send('This show add successfuly to viewd shows list')
    }).catch((err)=>res.send(err+''))
})


module.exports=router