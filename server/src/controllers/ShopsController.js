//import models
var Shop = require('../models/shop');


module.exports = {
  async index (req, res) {
    try {
      const shops = await Shop.find({}).limit(10);
      console.log(shops)
      res.send(shops)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to fetch the shops'
      })
    }
  },
}