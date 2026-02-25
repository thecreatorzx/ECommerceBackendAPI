import express from "express";
import {
  getCartItems,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const cartRoutes = express.Router();

cartRoutes
  .route("/")
  .get(getCartItems)
  .post(addToCart)
  .patch(updateCartQuantity)
  .delete(clearCart);
cartRoutes.route("/:productId").delete(removeFromCart);

export { cartRoutes };
