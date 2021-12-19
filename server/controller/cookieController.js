// cookieController.js

// Import contact model
Cookie = require('../model/cookieModel');

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
    cookie.name = req.body.name ? req.body.name : cookie.name;
    cookie.email = req.body.email;
    
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
            res.send(err);cookie.name = req.body.name ? req.body.name : cookie.name;
        cookie.email = req.body.email;
        
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