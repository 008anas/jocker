const db = require("../models");
const Joke = db.jokes;

// Find a single Joke with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Joke.findByPk(id)
    .then(data => res.send(data))
    .catch(() => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};