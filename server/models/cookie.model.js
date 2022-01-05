// authorModel.js
var mongoose = require('mongoose');

// Setup schema
var cookieSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    recette: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
    }
});

// Export Cookie model
var Cookie = module.exports = mongoose.model('cookie', cookieSchema);

module.exports.get = function (callback, limit) {
    Cookie.find(callback).limit(limit);
}