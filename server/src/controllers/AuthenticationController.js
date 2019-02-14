//import models
var Shop = require('../models/shop');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const bcrypt = require('bcrypt-nodejs');


function jwtSignUser (user) {
    const ONE_WEEK = 60*60*24*7
    return jwt.sign(user.toJSON(), config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    })
}

function encryptPassword (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};


module.exports = {
  async register (req, res) {
    try {
      req.body.password = encryptPassword(req.body.password)
      const user = await User.create(req.body)
      res.send({
        user: user,
        token: jwtSignUser(user)
      })
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
          email: email
      });
      if (!user) {
        console.log('nnnnnnnnnnn')
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.validPassword(password)
      if (!isPasswordValid) {
        console.log('n')
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      res.send({
        user: user,
        token: jwtSignUser(user)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to log in'
      })
    }
  }
}