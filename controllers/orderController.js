import orderModel from "../models/orderModel.js";
import CartModel from "../models/cartModel.js";
import ProductModel from "../models/productModel.js";

const createOrder = (req, res) => {
  orderModel.serialize(() => {
    orderModel.beginTxn();
    CartModel.findAll((err, cartRows) => {
      if (err) {
        orderModel.rollBack();
        console.error("Error fetching cart items");
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }
      if (cartRows.length === 0) {
        orderModel.rollBack();
        console.log("Empty cart, no item in cart");
        return res.status(400).json({
          success: false,
          message: "Cart is empty",
        });
      }
      let stockError = null;
      let total_amount = 0;
      const updatedStockItems = [];

      let processed = 0;
      cartRows.forEach((item) => {
        ProductModel.findById(item.productId, (err, productRow) => {
          processed++;
          if (err || !productRow) {
            stockError = `Product with ID ${item.productId} not found`;
          } else if (productRow.stock < item.quantity) {
            stockError = `Insufficient stock for product ID ${item.productId}`;
          } else {
            const totalPrice = productRow.price * item.quantity;
            updatedStockItems.push({
              id: productRow.id,
              newStock: productRow.stock - item.quantity,
              totalPrice,
            });
          }
          if (processed === cartRows.length) {
            if (stockError) {
              orderModel.rollBack();
              return res
                .status(400)
                .json({ success: false, error: stockError });
            }
            total_amount = updatedStockItems.reduce(
              (sum, item) => sum + item.totalPrice,
              0,
            );
            let stockProcessed = 0;
            updatedStockItems.forEach((prod) => {
              ProductModel.updateStock(
                { id: prod.id, stock: prod.newStock },
                (err) => {
                  stockProcessed++;
                  if (err) {
                    orderModel.rollBack();
                    console.error("Error udpating stock: ", err.message);
                    return res.status(500).json({
                      success: false,
                      error: err.message,
                    });
                  }
                  if (stockProcessed === updatedStockItems.length) {
                    orderModel.create({ total_amount }, function (err) {
                      if (err) {
                        orderModel.rollBack();
                        console.error("Error creating order: ", err.message);
                        return res
                          .status(500)
                          .json({ success: false, error: err.message });
                      }
                      const orderId = this.lastID;
                      CartModel.clear((err) => {
                        if (err) {
                          orderModel.rollBack();
                          console.error("Error clearing cart:", err.message);
                          return res
                            .status(500)
                            .json({ success: false, error: err.message });
                        }
                        orderModel.commit((err) => {
                          if (err) {
                            orderModel.rollBack();
                            console.error(
                              "Error committing order: ",
                              err.message,
                            );
                            return res.status(500).json({
                              success: false,
                              error: err.message,
                            });
                          }
                          console.log("Order created successfully");
                          res.json({
                            success: true,
                            message: "Order placed successfully",
                            total: total_amount,
                            orderId,
                          });
                        });
                      });
                    });
                  }
                },
              );
            });
          }
        });
      });
    });
  });
};
const getAllOrders = (req, res) => {
  orderModel.findAll((err, rows) => {
    if (err) {
      console.error("Error while fetching orders: ", err.message);
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
    res.json({ success: true, data: rows });
  });
};
const getOrderById = (req, res) => {
  const { id } = req.body;
  orderModel.getOrderById(id, (err, row) => {
    if (err) {
      console.error(
        "Error while fetching order with id ",
        id,
        ": ",
        err.message,
      );
      res.status(500).json({ success: false, error: err.message });
    }
    console.log("Successfully fetched order");
    res.json({
      success: true,
      data: row,
    });
  });
};
export { createOrder, getAllOrders, getOrderById };
