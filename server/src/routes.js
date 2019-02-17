//imports
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const ShopsController = require('./controllers/ShopsController');
const UserController = require('./controllers/UserController');
var User = require('./models/user');
var jwt = require('jsonwebtoken');
const config = require('./config/config');



// routes
module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register),
  app.post('/login',
    AuthenticationController.login),

  app.post('/shops',
      ShopsController.index),
  app.post('/like-shops',
      ShopsController.like),
  app.post('/dislike-shops',
      ShopsController.dislike)

  app.post('/my-shops',
    //isLoggedIn,
    UserController.index),
  app.post('/remove-shops',
    UserController.remove)
}


//Middleware
function isLoggedIn(req, res, next) {
  //console.log(req.get('Authorization'), typeof req.get('Authorization'))
  console.log(req.get('Authorization'))
  console.log(req.user)
  var userToken = req.get('Authorization')
  console.log(userToken)
  if (userToken == null) {
      var user = jwt.verify(req.get('Authorization'), config.authentication.jwtSecret);
      console.log(user)
    console.log('here')
  }  else {
    console.log('jwt needed')
      res.send('JWTNOTProvided')
  }

  // if (req.isAuthenticated()) {
  //   return next();
  // }
  //req.session.oldUrl = req.url;
}