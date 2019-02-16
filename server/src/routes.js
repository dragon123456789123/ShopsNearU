const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ShopsController = require('./controllers/ShopsController')
const UserController = require('./controllers/UserController')


/* const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/HistoriesController')

const isAuthenticated = require('./policies/isAuthenticated')*/

//import models


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
      UserController.index),
  app.post('/remove-shops',
    UserController.remove)
}