const { default: axios } = require("axios");
const { KeyApi, Shows_API } = require("../constant");
const { customizeShows } = require("../showsHelper");

const getTrend=async(mediaType,time)=>{
  const res=await axios.get(`${Shows_API}/trending/${mediaType}/${time}`,{
    params:{
      api_key:KeyApi
    }
  })
  return await customizeShows(res.data)
}



const getShowById=async(mediaType,id,lang)=>{
  const res=await axios.get(`${Shows_API}/${mediaType}/${id}`,{
    params:{
      api_key:KeyApi,
      language:lang
    }
  })
  return res.data
}


const getSearchShows=async(mediaType,searchedFor)=>{
  const res=await axios.get(`${Shows_API}/search/${mediaType}`,{
    params:{
      api_key:KeyApi,
      query:searchedFor
    }
  })
  return customizeShows(res.data,mediaType)
}

module.exports = {getTrend,getShowById,getSearchShows};
