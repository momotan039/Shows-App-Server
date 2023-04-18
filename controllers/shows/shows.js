const express = require("express");
const { Api, Error_Message } = require("../../services/constant");
const { getMovies, getMyMovies } = require("../../services/shows api/movies");
const {
  getTrend,
  getShowById,
  getSearchShows,
  getActorsShows,
} = require("../../services/shows api/showsAPI");
const { getTvShows, getMyTvShows } = require("../../services/shows api/tv");
const { getAllGenres } = require("../../services/showsHelper");
const router = express.Router();

router.get(Api + "/shows/trending", async (req, res) => {
  const data = await getTrend("all", "day");
  const result={...data,results:data.results.slice(0,4)}
  res.send(result);
});

router.get(Api + "/shows/:type", async (req, res) => {
  const { type } = req.params;
  let shows;
  if (type === "movies") shows = await getMovies(req.query);
  else if (type === "tv") shows = await getTvShows(req.query);
  else {
    res.send("invalid type show!!");
    return;
  }
  res.send(shows);
});

router.get(Api + "/shows/:type/recommended", async (req, res) => {
  const { type } = req.params;
  let shows;
  if (type === "movie") shows = await getMyMovies(req.user,req.query);
  else if (type === "tv") shows = await getMyTvShows(req.user,req.query);
  else {
    res.send("invalid type show!!");
    return;
  }
  res.send(shows);
});

router.get(Api + "/show/:type/:show_id", async (req, res) => {
  try {
    const { type, show_id } = req.params;
    const show = await getShowById(type, show_id, req.user.preferences.lang);
    res.send(show);
  } catch (error) {
    res.send(Error_Message);
  }
});

router.get(Api + "/genres", async(req, res) => {
  await getAllGenres()
    .then((data) =>{
      res.send(data)
    })
    .catch((err) => res.send(err));
});

router.get(Api + "/search/:type/:searchedFor", async(req, res) => {
  const {searchedFor,type}=req.params
  await getSearchShows(type,searchedFor,req.query)
    .then((data) =>{
      res.send(data)
    })
    .catch((err) => res.send(err));
});

router.get(Api + "/casts/:type/:id", async(req, res) => {
  const {type,id}=req.params
  await getActorsShows(type,id)
    .then((data) =>{
      res.send(data.cast)
    })
    .catch((err) => res.send(err));
});

module.exports = router;
