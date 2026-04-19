const express = require("express");
const productrouter = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { authorizedRoles } = require("../middlewares/rolesMiddleware");

const {
  createProduct,getProduct, getOneProduct, updateProduct,deleteProduct,
  updateProductImage,createProductwithEmail} = require("../controllers/productController");
const upload = require("../middlewares/cloudinaryMiddlewares");

// Protect ALL product routes
productrouter.use(protect);

//productrouter.post("/product", authorizedRoles("admin"), createProduct);
productrouter.get("/product", authorizedRoles("salesperson", "admin"), getProduct);
productrouter.get("/product/:id", getOneProduct);
productrouter.patch("/product/:id", updateProduct);
productrouter.delete("/product/:id", deleteProduct);
productrouter.patch("/upload", updateProductImage);
productrouter.post("/createproductwithEmail",upload.single("image"), createProductwithEmail);



module.exports = productrouter;