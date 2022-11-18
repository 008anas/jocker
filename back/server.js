require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require('fs');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");

const Joke = db.jokes;

db.sequelize.sync({ force: true })
  .then(() => {
    let rawdata = fs.readFileSync('./src/data/jokes.json');
    let jokes = JSON.parse(rawdata);
    jokes.forEach(joke => {
      Joke.create({
        type: joke.type,
        setup: joke.setup,
        punchline: joke.punchline
      })
    });
  })
  .catch((err) => console.log("Failed to sync db: " + err.message));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to jocker app." });
});

require("./src/routes/joke.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});