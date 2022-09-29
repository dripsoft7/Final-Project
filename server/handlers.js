"use strict";

require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//posts new user
const createUser = async (req, res) => {
  const newUser = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
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
    const db = client.db("movieProject");
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

module.exports = {
  createUser,
  getUser,
};
