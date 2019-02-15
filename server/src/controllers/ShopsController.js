//import models
var Shop = require('../models/shop');
var User = require('../models/user')
var jwt = require('jsonwebtoken')
const config = require('../config/config')


module.exports = {
  async index (req, res) {
    try {
      const shops = await Shop.find({}).limit(10);
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
      console.log(t)

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
    try{

    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to like shops'
      })
    }
  },
  async remove (req, res){
    try{

    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to like shops'
      })
    }
  }
}