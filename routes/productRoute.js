const express = require ("express");
const route = express.Router();
const ProductRoute = require ("../controllers/productController");

route.post ("/product", ProductRoute.createProduct);
route.get("/product", ProductRoute.getProduct);
route.get("/product/:id", ProductRoute.getOneProduct);
route.patch ("/product/:id", ProductRoute.updateProduct);
route.delete("/product/:id", ProductRoute.deleteProduct);

module.exports = route;