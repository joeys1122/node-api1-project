// BUILD YOUR SERVER HERE
const express = require('express');
const usersModel = require('./users/model');

const server = express();
server.use(express.json());

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
      res.status(500).json({ message: "The user information could not be retrieved" });
    });
});

server.post('/api/users', (req, res) => {
  const body = req.body;
  
  if(!body.name || !body.bio) {
    res.status(400).json({ message: "Please provide name and bio for the user" })
  } else {
    usersModel.insert(body)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(() => {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
      })
  }
});

server.put('/api/users/:id', async (req, res) => {
  try {
    const user = await usersModel.findById(req.params.id);
    if(!user) {
      res.status(404).json({ message: "The user with the specified ID does not exist" });
      return;
    }

    const body = req.body;
    if(!body.name || !body.bio) {
      res.status(400).json({ message: "Please provide name and bio for the user" });
      return;
    } else {
      const newUser = await usersModel.update(req.params.id, body);
      res.status(200).json(newUser);
    }

  } catch(e) {
    res.status(500).json({ message: "The user information could not be modified" });
  }
});

server.delete('/api/users/:id', (req, res) => {
  usersModel.remove(req.params.id)
    .then(user => {
      user ? res.status(200).json(user) : res.status(404).json({ message: "The user with the specified ID does not exist" });
    })
    .catch(() => {
      res.status(500).json({ message: "The user could not be removed" });
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
