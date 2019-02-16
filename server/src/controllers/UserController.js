var Shop = require('../models/shop');
var User = require('../models/user')
var jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  async index(req, res) {
    try {
      var user = jwt.verify(req.body.userId,  config.authentication.jwtSecret);
      var arr = user.shops;
      var userShops = await User.findById({_id: user._id}, 'shops')
      console.log(userShops.shops)
      var shops = await Shop.find({_id: {$in: userShops.shops}});
      // console.log(shops)
      res.send(shops)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to fetch the shops'
      })
    }
  },
  async remove(req, res) {
    try {
      var shopId = req.body.shopId;
      var user = jwt.verify(req.body.userId,  config.authentication.jwtSecret)
      await Shop.findById(shopId, async function(err, shop, req) {
          User.update(
            {_id: user._id},
            {$pull: { shops: shop._id}},
            { safe: true, multi:true },
            function () {
              console.log("done")
            }
          )
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to remove shops'
      })
    }
  }
}