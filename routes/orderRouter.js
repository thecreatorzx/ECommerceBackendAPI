import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
} from "../controllers/orderController.js";

const orderRoutes = express.Router();
orderRoutes.route("/").get(getAllOrders).post(createOrder);
orderRoutes.route("/:id").get(getOrderById);

export { orderRoutes };
