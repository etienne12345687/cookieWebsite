// Import author controller
const cookieController = require('../controllers/cookie.controller');


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/cookie", cookieController.index);
    app.post("/api/cookie", cookieController.new);
    app.get("/api/cookie/:cookie_id", cookieController.view);
    app.patch("/api/cookie", cookieController.update);
    app.put("/api/cookie/:cookie_id", cookieController.update);
    app.delete("/api/cookie/:cookie_id", cookieController.delete);
  };