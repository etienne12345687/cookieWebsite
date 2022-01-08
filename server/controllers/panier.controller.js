
const Panier = require("../models/panier.model");


exports.index = function (req, res) {
    Panier.get(function (err, panier) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "panier retrieved successfully",
            data: panier
        });
    });
};

exports.new = (req, res) => {
    const panier = new Panier();
    panier.cookie = req.body.cookie;
    panier.quantity = req.body.quantity;
    panier.user = req.body.user;
    panier.prix = req.body.prix;
    panier.active = true;

    panier.save(function (err) {
        if (err) {
            res.json(err);
        }
        res.json({
            message: 'cookie ajouté au panier',
            data: panier
        });
    });
};

exports.update = function (req, res) {Panier.findById(req.params.panier_id, function (err, panier) {
    if (err){
        res.send(err);
    }
    
    panier.cookie = req.body.cookie;
    panier.quantity = req.body.quantity;
    panier.user = req.body.user;
    panier.prix = req.body.prix;
    panier.active = true;
    
    panier.save(function (err) {
        if (err){
            res.json(err);
        }
        res.json({
            message: 'Panier modifié'
        });
    });
});
};

// Handle delete cookie
exports.delete = function (req, res) {
    Panier.remove({
        _id: req.params.panier_id
    }, function (err, panier) {
        if (err){
            res.send(err);
        }
        res.json({
        message: 'Element du panier supprimé'
    });
});
};