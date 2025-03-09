const express = require("express");
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/product.controllers");
const validate = require("../../middlewares/validate");
const { productSchema } = require("../validations/product.validations");
const authMiddleware = require("../../middlewares/auth.middlewares");

const productRouter = express.Router();

productRouter.get("/all", getAllProducts);

// Product CRUD routes
productRouter.post("/",  authMiddleware,  createProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", authMiddleware, validate(productSchema), updateProduct);
productRouter.delete("/:id", authMiddleware, deleteProduct);

module.exports = productRouter;
