const { default: axios } = require("axios")
const { Shows_API, KeyApi } = require("../constant")


const getTvShows=async(query)=>{
    const res=await axios.get(`${Shows_API}/discover/tv`,{
      params:{
        with_cast:query.cast,
        with_genres:query.genres,
        with_original_language:query.show_lang,
        api_key:KeyApi
      }
    })
    return res.data
}

const getMyTvShows=async(user)=>{
  const {lang,show_lang,genres}=user.preferences
  const res=await axios.get(`${Shows_API}/discover/tv`,{
    params:{
      language:lang,
      with_genres:genres.map(g=>g.id).join(','),
      with_original_language:show_lang,
      api_key:KeyApi
    }
  })
  return res.data
}


module.exports={getTvShows,getMyTvShows}

