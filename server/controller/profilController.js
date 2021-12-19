// profilController.js

// Import contact model
Profil = require('../model/profilModel');

// Handle index actions
exports.index = function (req, res) {
    Profil.get(function (err, profil) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "profil retrieved successfully",
            data: profil
        });
    });
};

// Handle create cookie actions
exports.new = function (req, res) {
    var profil = new Profil();
    profil.name = req.body.name ? req.body.name : profil.name;
    profil.email = req.body.email;
    
    // save the profil and check for errors
    profil.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New profil created!',
            data: profil
        });
    });
};

// Handle view profil info
exports.view = function (req, res) {
    Profil.findById(req.params.profil_id, function (err, profil) {
        if (err)
            res.send(err);
        res.json({
            message: 'profil details loading..',
            data: profil
        });
    });
};


// Handle update profil info
exports.update = function (req, res) {Profil.findById(req.params.profil_id, function (err, profil) {
        if (err)
            res.send(err);profil.name = req.body.name ? req.body.name : profil.name;
        profil.email = req.body.email;
        
        // save the profil and check for errors
        profil.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'profil Info updated',
                data: profil
            });
        });
    });
};

// Handle delete profil
exports.delete = function (req, res) {
    Profil.remove({
        _id: req.params.profil_id
    }, function (err, profil) {
        if (err)
            res.send(err);res.json({
            status: "success",
            message: 'profil deleted'
        });
    });
};