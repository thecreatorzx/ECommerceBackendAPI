import express from "express";
import {
  addToProducts,
  updatePrice,
  updateStock,
  getAllProducts,
  getProductById,
  searchProducts,
} from "../controllers/productController.js";

const productRoutes = express.Router();
productRoutes.route("/").get(getAllProducts).post(addToProducts);
productRoutes.route("/price").patch(updatePrice);
productRoutes.route("/stock").patch(updateStock);
productRoutes.route("/search").get(searchProducts);
productRoutes.route("/:id").get(getProductById);

export { productRoutes };
