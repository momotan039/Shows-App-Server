const { default: axios } = require("axios");
const { KeyApi, Shows_API } = require("./constant");

const getAllGenres = async () => {
    const res = await axios.get(
      `${Shows_API}/genre/list?api_key=${KeyApi}`
    );
    return res.data.genres;
};

const getFilterdShows=async()=>{
    //primary_release_year
    //with_genres
    //with_original_language
    //https://api.themoviedb.org/3/discover/movie?api_key=a13ad929fd75ee4e43f8ea1cb4f6b062&with_original_language=ar
}


module.exports = { getAllGenres };
