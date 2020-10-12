const router = require('express').Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Jokes = require('../jokes/jokes-model')
const jwtSecret = require('../auth/jwtSecret')

router.post('/register', (req, res) => {
  const user = req.body
  const hash = bcryptjs.hashSync(user.password,8)

  user.password = hash

  Jokes.add(user)
    .then( user => {
      console.log('user inside add .then:', user)
      res.status(201).json(user)
    }).catch(err =>{
      console.log('err inside authrouter:', err)
      res.status(400).json(err)
    })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
