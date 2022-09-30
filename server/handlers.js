"use strict";

require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
// console.log(process.env.MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//posts new user
const createUser = async (req, res) => {
  const newUser = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("movieProject");
    const data = await db.collection("users").insertOne(newUser);

    res.status(200).json({
      status: 200,
      message: "New user added",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error adding new user",
    });
    console.log(error);
  } finally {
    client.close();
  }
};

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("movieProject");
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const addFavorite = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { email, movie } = req.body;
  const movieId = movie.movie.id;
  try {
    await client.connect();
    const db = client.db("movieProject");
    const movieUser = await db
      .collection("userFavorites")
      .updateOne({ email: email }, { $addToSet: { favorites: movieId } }, true);
    res.status(201).json({
      status: 201,
      data: movieUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error adding user favorites",
    });
  } finally {
    client.close();
  }
};

// const getUserFavorites = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);
//   try {
//     await client.connect();
//     const db = client.db("movieProject");

//     const movieUser = await db.collection("userFavorites").findOne({
//       displayName: req.params.displayName,
//     });

//     if (!movieUser) {
//       res.status(404).json({
//         status: 404,
//         message: "No user",
//       });
//     } else {
//       res.status(200).json({
//         status: 200,
//         movieUser: movieUser.favorites,
//       });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ status: 500, message: "Error retrieving user favorites" });
//   } finally {
//     client.close();
//   }
// };
const getUserFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.params.userEmail;

  try {
    await client.connect();
    const db = client.db("movieProject");
    const data = await db.collection("users").findOne({ email: userEmail });

    res.status(200).json({
      status: 200,
      result: data,
      message: "Favorites found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error retrieving user favorites",
    });
  } finally {
    client.close();
  }
};

module.exports = {
  createUser,
  getUser,
  addFavorite,
  getUserFavorites,
};
