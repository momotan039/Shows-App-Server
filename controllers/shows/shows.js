const express=require('express')
const { Api } = require('../../services/constant')
const { db } = require('../../services/database')
const { getMovies, getMyMovies } = require('../../services/shows api/movies')
const { getTrend } = require('../../services/shows api/showsAPI')
const router=express.Router()

router.get(Api+'/shows/movies',async (req,res)=>{
const movies=await getMovies(req.query)
res.send(movies)
})

router.get(Api+'/shows/movies/recommended',async (req,res)=>{
const movies=await getMyMovies(req.user)
res.send(movies)
})

router.get(Api+'/shows/trending',async (req,res)=>{
    const shows=await getTrend('all','day')
    res.send(shows)
    })
router.get(Api+'/shows/favorite',async(req,res)=>{
    const shows= await db.collection('favorite_shows').find({userId:req.user._id}).toArray()
    res.send(shows)
})
module.exports=router