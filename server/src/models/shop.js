var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    picture: {type: String, requird: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    city: {type: String, required: true},
    location: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            },
        },
});

module.exports = mongoose.model('Shop', schema);

