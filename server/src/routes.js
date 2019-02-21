//imports
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const ShopsController = require('./controllers/ShopsController');
const UserController = require('./controllers/UserController');



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
};
