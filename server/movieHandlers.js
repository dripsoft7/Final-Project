"use strict";

require("dotenv").config();

const { default: axios } = require("axios");
const BASE_AXIOS = axios.create({ baseURL: "https://api.themoviedb.org/3" });
const { URL, KEY, Image } = process.env;
// console.log(process.env.MONGO_URI);
// console.log(process.env.KEY);

const getPopularMovies = (page) => {
  BASE_AXIOS.get(`/movie/popular?api_key=${KEY}&language=en-US&page=${page}`);
};

// getPopularMovies();

module.exports = { getPopularMovies };
