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
productRoutes.route("/:id").get(getProductById);
productRoutes.route("/price").patch(updatePrice);
productRoutes.route("/stock").patch(updateStock);
productRoutes.route("/search").get(searchProducts);

export { productRoutes };
