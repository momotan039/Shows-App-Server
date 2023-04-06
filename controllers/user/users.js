const express=require('express');
const { ObjectId } = require('mongodb');
const { Api } = require('../../services/constant');
const router=express.Router()
const {db} = require("../../services/database");

router.get(Api+'/users',async(req,res)=>{
const users=await db.collection('users').find({}).toArray()
res.send(users)
})

router.delete(Api+'/users/:id',async(req,res)=>{
const {id}=req.params
try {
   const result= await db.collection('users').deleteOne({_id:new ObjectId(id)})
   if(result.deletedCount===1)
   res.send('user deleted successfully')
   else
   res.send('deleting user fiald!!')
} catch (error) {
    res.send({
        message:'occured error While handel the process'
    })
}
})

module.exports=router