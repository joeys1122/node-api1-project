// BUILD YOUR SERVER HERE
const express = require('express');
const usersModel = require('./users/model');

const server = express();

server.get('/api/users', (req, res) => {
  usersModel.find()
    .then(user => {
      res.json(user);
    })
    .catch(() => {
      res.status(500).json({ message: "The users information could not be retrieved" });
    });
});

server.get('/api/users/:id', (req, res) => {
  usersModel.findById(req.params.id)
    .then(user => {
      user ? res.json(user) : res.status(404).json({ message: "The user with the specified ID does not exist" })
    })
    .catch(() => {
      res.status(404).json({ message: "The user with the specified ID does not exist" });
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
