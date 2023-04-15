const { default: axios } = require("axios")
const { Shows_API, KeyApi } = require("./constant")

const customizeShows=async (data,mediaType)=>{
    let allGenres=[]
    const shows=data.results
    if(shows.length>0) 
     allGenres=await getAllGenres()
    const temp= shows.map((show)=>{
        //1- add mediaType for every single show
        if(mediaType)
        show.media_type=mediaType
        //2- add generse to every single show
        const genres=show.genre_ids.map((g)=>{
            return {
                id:g,
                name:allGenres.find(f=>f.id===g)?.name
            }
        })
        //delete prevoius genres property
        delete show.genre_ids
        //add new genres property
        return {...show,genres:genres}
    })
    return {...data,results:temp}
}


const getAllGenres = async () => {
    const res_tv = await axios.get(
      `${Shows_API}/genre/tv/list?api_key=${KeyApi}`
    );
    const res_movie = await axios.get(
      `${Shows_API}/genre/movie/list?api_key=${KeyApi}`
    );
    const genres_movie=res_movie.data.genres
    const genres_tv=res_tv.data.genres
    return genres_movie.concat(genres_tv);
  };
  
module.exports={customizeShows,getAllGenres}