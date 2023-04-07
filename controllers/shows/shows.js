const express = require("express");
const { ObjectId } = require("mongodb");
const { Api, Error_Message } = require("../../services/constant");
const { db } = require("../../services/database");
const { getMovies, getMyMovies } = require("../../services/shows api/movies");
const { getTrend, getShowById } = require("../../services/shows api/showsAPI");
const { getTvShows, getMyTvShows } = require("../../services/shows api/tv");
const router = express.Router();


router.get(Api + "/shows/trending", async (req, res) => {
    const shows = await getTrend("all", "day");
    res.send(shows);
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
    if (type === "movies") shows = await getMyMovies(req.user);
    else if (type === "tv") shows = await getMyTvShows(req.user);
    else {
        res.send("invalid type show!!");
        return;
    }
  res.send(shows);
});

router.get(Api + "/show/:type/:show_id", async (req, res) => {
  try {
    const { type, show_id } = req.params;
    const show = await getShowById(type, show_id,req.user.preferences.lang);
    res.send(show);
  } catch (error) {res.send(Error_Message)}
});

module.exports = router;
