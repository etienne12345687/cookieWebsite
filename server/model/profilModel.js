// profilModel.js
var mongoose = require('mongoose');

// Setup schema
var profilSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    panierEnCours: {
        type: String
    },
    panier:{
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Profil model
var Profil = module.exports = mongoose.model('profil', profilSchema);

module.exports.get = function (callback, limit) {
    Profil.find(callback).limit(limit);
}