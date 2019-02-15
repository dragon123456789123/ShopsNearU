var Shop = require('../models/shop');
var User = require('../models/user')
var jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  async index(req, res) {
    try {
      var user = jwt.verify(req.body.userId,  config.authentication.jwtSecret);
      var arr = user.shops;
      //console.log(arr)
      var shops = await Shop.find({_id: {$in: arr}});
      res.send(shops)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to fetch the shops'
      })
    }
  },
}