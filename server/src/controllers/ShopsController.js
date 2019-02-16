//import models
var Shop = require('../models/shop');
var User = require('../models/user')
var jwt = require('jsonwebtoken')
const config = require('../config/config')
const moment = require('moment')


module.exports = {
  async index (req, res) {
    try {
      console.log(req.body)
      if(req.body.userId!=null)
        var user = jwt.verify(req.body.userId,  config.authentication.jwtSecret)
      console.log('nnnnnnnnnn')
      const shops = await Shop.find({}).limit(10);
      console.log(user)
      if(user!=null && user.disliked != null) {
        console.log("jjjjjjjjjjj")
        user.disliked.forEach(function (shop) {
          var duration = moment.duration(moment.max().diff(shop.time))
          var seconds = duration.asSeconds();
          console.log(seconds)
          for (var i = 0; i < shops.length; i++) {
            if ((JSON.stringify(shops[i]._id) == JSON.stringify(shop.shop)) && (seconds < 3600)) {
              shops.splice(i, 1);
            } else{
              User.update(
                {_id: user._id},
                {$pull: {disliked: shop}},
                function (data) {
                  console.log('done')
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
  async like (req, res){
    try{
      //console.log(req.body)
      var shopId = req.body.shopId;
      var user = jwt.verify(req.body.userId,  config.authentication.jwtSecret)
      //console.log(user)
      var t = user.shops.indexOf(shopId);
      //console.log(t)

      if(t==-1){
        Shop.findById(shopId, async function(err, shop, req) {
          if (err) {
          }
            User.update(
              {_id: user._id},
              {$push: {shops: shop._id}},
              function () {
                console.log("done")
              }
            )
        })
      }
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to like shops'
      })
    }
  },
  async dislike (req, res){
    try {
      var shopId = req.body.shopId;
      var user = jwt.verify(req.body.userId, config.authentication.jwtSecret)
      console.log(user)
      let n = 0
      for (let disliked of user.disliked) {
        if (disliked.shop.toString() == shop._id.toString()) {
          n = -1
          break
        }
      }
        if (n == 0) {
          Shop.findById(shopId, async function (err, shop, req) {
            if (err) {
            }
            User.update(
              {_id: user._id},
              {$push: {disliked: {shop: shop._id}}},
              function () {
                console.log("done")
              }
            )
          })
        }
    }catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to like shops'
      })
    }
  },
}