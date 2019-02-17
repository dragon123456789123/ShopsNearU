//imports
var Shop = require('../models/shop');
var User = require('../models/user')
var jwt = require('jsonwebtoken')
const config = require('../config/config')

//controllers
module.exports = {
  async index(req, res) {
    try {
      var user = jwt.verify(req.body.userId, config.authentication.jwtSecret);
      var userShops = await User.findById({_id: user._id}, 'shops');
      var shops = await Shop.find({_id: {$in: userShops.shops}});
      res.send(shops)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to fetch the shops'
      })
    }
  },
  async remove(req, res) {
    try {
      var shopId = req.body.shopId;
      var user = jwt.verify(req.body.userId, config.authentication.jwtSecret)
      var updatedUser = await User.update(
        {_id: user._id},
        {$pull: {shops: shopId}}
      )
      res.send(updatedUser)   //inform frontend of update
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to remove shops'
      })
    }
  }
}