const express = require('express');

const server = express();

server.use(express.json());

const users = ['Guilherme', 'Matheus', 'Corrêa'];

/**
 * Local middleware that checks if the req.body has a user
 */
function checkIfUsernameExists(req, res, next) {
  const user = req.body.name;

  if(!user) {
    return res.status(400).json({ error: 'Username is required' })
  }

  //Attach user to the req object
  req.user = user;

  return next()
}

/**
 * Return all the users
 */
server.get('/users', (req, res) => {
  return res.json(users);
});

/**
 * Return a single user
 */
server.get('/users/:index', (req, res) => {
  const { index } = req.params;
  const user = users[index];

  return res.json(user)
});

/**
 * Create a new user
 */
server.post('/users', checkIfUsernameExists, (req, res) => {
  users.push(req.user);

  return res.json(users);
});

/**
 * Edit a user 
 */
server.put('/users/:index', checkIfUsernameExists, (req, res) => {
  const { index } = req.params;
  
  users[index] = req.user;

  return res.json(users);
});

/**
 * Delete a user
 */
server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3333);