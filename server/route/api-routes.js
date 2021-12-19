// api-routes.js// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub !',
    });
});

// Import author controller
var cookieController = require('../controller/cookieController');

// author routes
router.route('/cookie')
    .get(cookieController.index)
    .post(cookieController.new);router.route('/cookie/:cookie_id')
    .get(cookieController.view)
    .patch(cookieController.update)
    .put(cookieController.update)
    .delete(cookieController.delete);


// Import book controller
var profilController = require('../controller/profilController');

// Book routes
router.route('/profil')
    .get(profilController.index)
    .post(profilController.new);router.route('/profil/:profil_id')
    .get(profilController.view)
    .patch(profilController.update)
    .put(profilController.update)
    .delete(profilController.delete);


    // Export API routes
module.exports = router;