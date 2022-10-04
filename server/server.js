"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  addUser,
  getUser,
  deleteUser,
  addFavorite,
  getUserFavorites,
  deleteFromFavorites,
} = require("./handlers");

const { getPopularMovies } = require("./movieHandlers");

const PORT = 8000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())

  .put("/api/favorites", addFavorite)
  .post("/api/new-user", addUser)
  .get("/api/get-user", getUser)
  .delete("/api/delete-account", deleteUser)
  .get("/api/get-user-favorites", getUserFavorites)
  .delete("/api/remove-favorite/:id", deleteFromFavorites)

  //movie api
  .get("/api/popular-movies", getPopularMovies)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
