/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwtSecret = 'secretsss'
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
  const authorization = req.headers?
  req.headers.authorization.split(' ')[1]:
  '';

  console.log('authozization',authorization)

  if (authorization){
    jwt.verify(authorization,jwtSecret,(err,decodedToken) => {
      if(err){
        res.status(401).json({message:'invalid creds'})
      }else{
        req.decodedToken = decodedToken
        next()
      }
    })
  }else{
    res.status(400).json({message:'no creds'})
  }
};
