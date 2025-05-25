const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./models");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes for http methods
app.use("/api/movies", require("./routes/movie.routes"));
app.use("/api/actors", require("./routes/actor.routes"));
app.use("/api/producers", require("./routes/producer.routes"));

//default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the IMDB Clone API." });
});

module.exports = app;
