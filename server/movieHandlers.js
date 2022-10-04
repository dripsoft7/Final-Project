"use strict";
const request = require("request-promise");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { MongoClient } = require("mongodb");
const { URL, KEY, Image } = process.env;
// console.log(process.env.MONGO_URI);
console.log(process.env.KEY);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getPopularMovies = async (req, res) => {
  const options = {
    method: "GET",
    uri: `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`,
    headers: {
      useQueryString: true,
    },
  };
  try {
    const response = await request(options);
    const data = await JSON.parse(response);
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
};

module.exports = { getPopularMovies };
