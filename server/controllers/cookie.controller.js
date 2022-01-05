// cookieController.js

// Import contact model
Cookie = require('../models/cookie.model');

// Handle index actions
exports.index = function (req, res) {
    Cookie.get(function (err, cookies) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "cookies retrieved successfully",
            data: cookies
        });
    });
};

// Handle create cookie actions
exports.new = function (req, res) {
    var cookie = new Cookie();
    cookie.nom = req.body.nom ? req.body.nom : cookie.nom;
    cookie.recette = req.body.recette;
    cookie.prix = req.body.prix;
    cookie.photo = req.body.photo;
    
    // save the cookie and check for errors
    cookie.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New cookie created!',
            data: cookie
        });
    });
};

// Handle view cookie info
exports.view = function (req, res) {
    Cookie.findById(req.params.cookie_id, function (err, cookie) {
        if (err)
            res.send(err);
        res.json({
            message: 'cookie details loading..',
            data: cookie
        });
    });
};


// Handle update cookie info
exports.update = function (req, res) {Cookie.findById(req.params.cookie_id, function (err, cookie) {
        if (err)
            res.send(err);
            
        cookie.nom = req.body.nom ? req.body.nom : cookie.nom;
        cookie.recette = req.body.recette;
        cookie.prix = req.body.prix;
        cookie.photo = req.body.photo;
        
        // save the cookie and check for errors
        cookie.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'cookie Info updated',
                data: cookie
            });
        });
    });
};

// Handle delete cookie
exports.delete = function (req, res) {
    Cookie.remove({
        _id: req.params.cookie_id
    }, function (err, cookie) {
        if (err)
            res.send(err);res.json({
            status: "success",
            message: 'cookie deleted'
        });
    });
};