const { default: axios } = require("axios");
const { KeyApi, Shows_API } = require("../constant");

const getAllGenres = async () => {
    const res = await axios.get(
      `${Shows_API}/genre/list?api_key=${KeyApi}`
    );
    return res.data.genres;
};


const getTrend=async(mediaType,time)=>{
  const res=await axios.get(`${Shows_API}/trending/${mediaType}/${time}`,{
    params:{
      api_key:KeyApi
    }
  })
  return res.data
}


module.exports = { getAllGenres,getTrend};
