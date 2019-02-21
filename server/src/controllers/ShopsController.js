//import models
var Shop = require('../models/shop');
var User = require('../models/user')
var jwt = require('jsonwebtoken')
const config = require('../config/config')
const moment = require('moment')

//controllers
module.exports = {

  //render shops
  async index(req, res) {
    try {
      if (req.body.userId != null) {
        var user = jwt.verify(req.body.userId, config.authentication.jwtSecret)
        var userShops = await User.findById({_id: user._id}, 'shops')
        var userDisliked = await User.findById({_id: user._id}, 'disliked')
      }
      const shops = await Shop.find({});
      //removing liked shops from main page
      if (user != null && userShops.shops != null) {
        await userShops.shops.forEach(function (shop) {
          for (var i = 0; i < shops.length; i++) {
            if ((JSON.stringify(shops[i]._id) == JSON.stringify(shop))) {
              shops.splice(i, 1);
            }
          }
        });
      }
      // removing disliked shops from main page
      if (user != null && userDisliked.disliked != null) {
        await userDisliked.disliked.forEach(async function (shop) {
          var duration = moment.duration(moment.max().diff(shop.time))
          var seconds = duration.asSeconds();
          for (var i = 0; i < shops.length; i++) {
            if ((JSON.stringify(shops[i]._id) == JSON.stringify(shop.shop)) && (seconds < 5)) {
              shops.splice(i, 1);
            } else if (seconds > 5) {
              var updatedUser = await User.update(
                {_id: user._id},
                {$pull: {disliked: shop}},
              )
              res.send(updatedUser)         //inform frontend of update
            }
          }
        });
      }
      res.send(shops)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to fetch the shops'
      })
    }
  },

  //like shops feature
  async like(req, res) {
    try {
      var shopId = req.body.shopId;
      var user = jwt.verify(req.body.userId, config.authentication.jwtSecret)
      var userShops = await User.findById({_id: user._id}, 'shops')
      var t = userShops.shops.indexOf(shopId);
      if (t == -1) {
        var updatedUser = await User.update(
          {_id: user._id},
          {$push: {shops: shopId}}
        )
      }
      res.send(updatedUser)     //inform frontend of update
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to like shops'
      })
    }
  },

  //dislike shops feature
  async dislike(req, res) {
    try {
      var shopId = req.body.shopId;
      var user = jwt.verify(req.body.userId, config.authentication.jwtSecret)
      var userDisliked = await User.findById({_id: user._id}, 'disliked')
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
      res.send(updatedUser)     //inform frontend of update
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to like shops'
      })
    }
  },
}