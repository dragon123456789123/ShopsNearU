const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ShopsController = require('./controllers/ShopsController')

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

  app.get('/shops',
      ShopsController.index)
}