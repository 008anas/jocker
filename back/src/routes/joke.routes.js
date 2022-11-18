module.exports = app => {
    const jokes = require("../controllers/joke.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve a single Joke with id
    router.get("/:id", jokes.findOne);
  
    app.use('/api/jokes', router);
  };