"use strict";
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
// console.log(process.env.MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//posts new user
const addUser = async (req, res) => {
  const { user } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = user.email;
  const login = Date();
  // console.log(req.body);
  try {
    // check if the user already exist or not
    await client.connect();
    const db = client.db("movieProject");
    const result = await db.collection("users").findOne({ email: userEmail });
    if (result) {
      await db
        .collection("users")
        .findOneAndUpdate({ email: userEmail }, { $set: { lastLogin: login } });
      return res
        .status(200)
        .json({ status: 200, message: "This user already exist!" });
    } else {
      const NewUser = Object.assign(
        { _id: uuidv4() },
        { lastLogin: Date() },
        { joined: Date() },
        user,
        { favorites: [] }
      );
      await db.collection("users").insertOne(NewUser);
      return res.status(201).json({ status: 201, message: "New user added!" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const getUser = async (req, res) => {
  const userEmail = req.headers.email;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("movieProject");
    const result = await db.collection("users").findOne({ email: userEmail });
    return res.status(201).json({ status: 200, data: result });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error retrieving user",
    });
  } finally {
    client.close();
  }
};

const deleteUser = async (req, res) => {
  const userEmail = req.headers.email;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("movieProject");
    const result = await db
      .collection("users")
      .findOneAndDelete({ email: userEmail });
    return res
      .status(204)
      .json({ status: 204, message: "User has been deleted!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

const addFavorite = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { user, movieId } = req.body;
  const userEmail = user.email;
  try {
    await client.connect();
    const db = client.db("movieProject");
    const result = await db.collection("users").findOne({ email: userEmail });
    const { favorites } = result;

    const ItemExistInFavorites = favorites.find((x) => x === movieId);
    if (!ItemExistInFavorites) {
      favorites.push(movieId);
    }
    const collections = {
      favorites,
    };
    await db.collection("users").findOneAndUpdate(
      { email: userEmail },
      {
        $set: { favorites: favorites },
      }
    );

    return res.status(201).json({
      status: 201,
      data: collections,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error adding user favorites",
    });
  } finally {
    client.close();
  }
};

const getUserFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.headers.email;
  try {
    await client.connect();
    const db = client.db("movieProject");
    const result = await db.collection("users").findOne({ email: userEmail });
    //user's collection of favorites
    const { favorites } = result;
    return res.status(201).json({
      status: 201,
      data: favorites,
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

const deleteFromFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.headers.email;
  const id = req.params.id;
  try {
    await client.connect();
    const db = client.db("Final-project");
    const result = await db.collection("users").findOne({ email: userEmail });

    const { favorites } = result;
    newFavorites = favorites.filter((x) => x !== Number(id));
    await db
      .collection("users")
      .findOneAndUpdate(
        { email: userEmail },
        { $set: { favorites: newFavorites } }
      );
    return res.status(200).json({ status: 200, data: newFavorites });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  addUser,
  getUser,
  deleteUser,
  addFavorite,
  getUserFavorites,
  deleteFromFavorites,
};
