var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    shops: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop"
        }
    ],
    disliked: [
        {
        shop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
        },
            time : {
                type : Date, default: Date.now
            },
        }
    ],
});


userSchema.methods.encryptPassword = async function(password) {
  return await bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);