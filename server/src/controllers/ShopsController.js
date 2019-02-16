//import models
var Shop = require('../models/shop');
var User = require('../models/user')
var jwt = require('jsonwebtoken')
const config = require('../config/config')
const moment = require('moment')


module.exports = {
  async index(req, res) {
    try {
      if (req.body.userId != null) {
        var user = jwt.verify(req.body.userId, config.authentication.jwtSecret)
        var userShops = await User.findById({_id: user._id}, 'shops')
        var userDisliked = await User.findById({_id: user._id}, 'disliked')
      }
      console.log('nnnnnnnnnn', userShops)
      const shops = await Shop.find({}).limit(10);
      if (user != null && userShops.shops != null) {
        await userShops.shops.forEach(function (shop) {
          for (var i = 0; i < shops.length; i++) {
            if ((JSON.stringify(shops[i]._id) == JSON.stringify(shop))) {
              shops.splice(i, 1);
            }
          }
        });
      }
      if (user != null && userDisliked.disliked != null) {
        console.log(userDisliked)
        await userDisliked.disliked.forEach(function (shop) {

          var duration = moment.duration(moment.max().diff(shop.time))
          var seconds = duration.asSeconds();
          console.log(seconds)
          for (var i = 0; i < shops.length; i++) {
            if ((JSON.stringify(shops[i]._id) == JSON.stringify(shop.shop)) && (seconds < 15)) {
              shops.splice(i, 1);
            } else if (seconds > 15) {
              User.update(
                {_id: user._id},
                {$pull: {disliked: shop}},
                function (data) {
                  console.log('donooooooooo')
                }
              )
            }
          }
        });
      }
      console.log(shops)
      res.send(shops)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to fetch the shops'
      })
    }
  },
  async like(req, res) {
    try {
      //console.log(req.body)
      var shopId = req.body.shopId;
      var user = jwt.verify(req.body.userId, config.authentication.jwtSecret)
      var userShops = await User.findById({_id: user._id}, 'shops')
      //console.log(user)
      var t = userShops.shops.indexOf(shopId);
      //console.log(t)

      var send = 'test'
      if (t == -1) {
        var updatedUser = await User.update(
          {_id: user._id},
          {$push: {shops: shopId}}
        )
        console.log(updatedUser)
        send = updatedUser
      }
      res.send(updatedUser)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to like shops'
      })
    }
  },
  async dislike(req, res) {
    try {
      var shopId = req.body.shopId;
      var user = jwt.verify(req.body.userId, config.authentication.jwtSecret)
      var userDisliked = await User.findById({_id: user._id}, 'disliked')
      console.log(user)
      let n = 0
      for (let disliked of userDisliked.disliked) {
        if (disliked.shop.toString() == shopId.toString()) {
          n = -1
          break
        }
      }
      if (n == 0) {
          var updatedUser = await User.update(
            {_id: user._id},
            {$push: {disliked: {shop: shopId}}},
          )
      }
      res.send(updatedUser)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to like shops'
      })
    }
  },
}