const router = require('express').Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Jokes = require('../jokes/jokes-model')
const jwtSecret = 'secretsss'

router.post('/register', (req, res) => {
  const user = req.body
  const hash = bcryptjs.hashSync(user.password,8)

  user.password = hash

  Jokes.add(user)
    .then( user => {
      // console.log('user inside add .then:', user)
      res.status(201).json(user)
    }).catch(err =>{
      // console.log('err inside authrouter:', err)
      res.status(400).json(err)
    })
});

router.post('/login', (req, res) => {
  // implement login
  
  let {username,password} = req.body
  // console.log('username', username,'username', {username})
  Jokes.findBy({username})
  .first()
  .then((user) => {
    // console.log('userin the .then:',user)
    if( user && bcryptjs.compareSync(password,user.password)){
      // console.log('madeitdown herre1')
      const token = generateToken(user);
      // console.log('madeitdown herre2')
      res.status(201).json({
        message:`welcome ${user.username}`,
        token
      })
    }else{
      res.status(401).json({message:'incalid creds'})
    }
  }).catch((err) => {
    res.status(500).json(err)
  })
});

function generateToken(user) {
  // console.log('made it to the tokengenerater')
  const payload = {
    
    subject: user.id,
    username: user.username,
    time:Date.now()
  }
  // console.log('made it to the tokengenerater1')
  const options = {
    expiresIn: '1h'
  }
  // console.log('made it to the tokengenerater2')
  return jwt.sign(payload,jwtSecret,options)
}

module.exports = router;
