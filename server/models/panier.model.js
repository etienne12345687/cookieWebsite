const mongoose = require("mongoose");

const panierSchema = mongoose.Schema({
    cookie: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    ],
    prix: {
      type: Number,
      required: true
    },
    payed: {
      type: Boolean,
      required: true
    },
    sent: {
      type: Boolean,
      required: true
    },
    dateTime: {
      type: Date,
      default: Date.now
    }
  }
);

var Panier = module.exports = mongoose.model('panier', panierSchema);

module.exports.get = function (callback, limit) {
    Panier.find(callback).limit(limit);
}