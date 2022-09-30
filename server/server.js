const express = require("express");
const morgan = require("morgan");
const {
  createUser,
  getUser,
  addFavorite,
  getUserFavorites,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())

  .put("/favorites", addFavorite)
  .post("/users", createUser)
  .get("/users-favorites/:displayName", getUserFavorites)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
