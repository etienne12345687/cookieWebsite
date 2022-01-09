// Import author controller
const panierController = require('../controllers/panier.controller');


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/panier", panierController.index);
    app.post("/api/panier", panierController.new);
    app.patch("/api/panier/:panier_id", panierController.update);
    app.put("/api/panier/:panier_id", panierController.update);
    app.delete("/api/panier/:panier_id", panierController.delete);
  };