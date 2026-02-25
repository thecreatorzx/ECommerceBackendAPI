import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

const getCartItems = (req, res) => {
  cartModel.findAll((err, rows) => {
    if (err) {
      console.error("Error while fetching cart items");
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log("Successfully fetched cart items");
    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  });
};

const addToCart = (req, res) => {
  const { productId } = req.body;
  if (!productId || typeof productId !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid productId" });
  }
  cartModel.serialize(() => {
    cartModel.beginTxn();

    cartModel.findByProductId(productId, (err, cartRow) => {
      if (err) {
        cartModel.rollBack();
        console.error("Error while finding item in cart: ", err.message);
        return res.status(500).json({ success: false, error: err.message });
      }
      if (!cartRow) {
        productModel.findById(productId, (err, productsRow) => {
          if (err) {
            cartModel.rollBack();
            console.error("Error while fetching from products");
            return res.status(500).json({
              success: false,
              error: err.message,
            });
          }
          if (!productsRow) {
            cartModel.rollBack();
            console.log("Item does not exist in products");
            return res.status(404).json({
              success: false,
              message: "Item not found in Products",
            });
          }
          console.log("Item not in cart. Adding to cart");
          cartModel.create(productId, function (err) {
            if (err) {
              cartModel.rollBack();
              console.error("Error while adding item to cart: ", err.message);
              return res
                .status(500)
                .json({ success: false, error: err.message });
            }
            cartModel.commit((err) => {
              if (err) {
                cartModel.rollBack();
                console.error("Error commiting to the cart: ", err.message);
                return res.status(500).json({
                  success: false,
                  error: err.message,
                });
              }
              console.log("Successfully added Item to cart");
              res.json({
                success: true,
                message: "Added item to cart, successfully",
              });
            });
          });
        });
      } else {
        cartModel.rollBack();
        return res.status(400).json({
          success: false,
          message: "Item already in cart",
        });
      }
    });
  });
};

const updateCartQuantity = (req, res) => {
  cartModel.serialize(() => {
    const { productId, increment } = req.body;
    if (!productId || typeof productId !== "number") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid productId" });
    }
    if (typeof increment !== "number") {
      return res.status(400).json({
        success: false,
        message: "Invalid increment",
      });
    }
    cartModel.beginTxn();
    cartModel.findByProductId(productId, (err, cartRow) => {
      if (err) {
        cartModel.rollBack();
        console.error("Error find item in cart: ", err.message);
        return res.status(500).json({ success: false, error: err.message });
      }
      if (!cartRow) {
        cartModel.rollBack();
        console.log("Item not in the cart");
        return res
          .status(404)
          .json({ success: false, message: "Item not found in cart" });
      }
      productModel.findById(productId, (err, productsRow) => {
        if (err) {
          cartModel.rollBack();
          console.error("Unable to fetch current product stock");
          return res.status(500).json({ success: false, error: err.message });
        }
        if (!productsRow) {
          cartModel.rollBack();
          console.log("Item in cart but not in the products");
          return res.status(404).json({
            success: false,
            message: "Item in cart not found in products",
          });
        }
        const productStock = productsRow.stock;
        const newQuantity = cartRow.quantity + increment;
        if (newQuantity < 0 || newQuantity > productStock) {
          cartModel.rollBack();
          console.error("Insufficient item quantity");
          return res
            .status(400)
            .send({ success: false, message: "Insufficient Item Count" });
        }
        cartModel.updateQuantity(
          { productId, quantity: newQuantity },
          (err) => {
            if (err) {
              cartModel.rollBack();
              console.error(
                "Unable to update the item quantity in cart: ",
                err.message,
              );
              return res
                .status(500)
                .send({ success: false, error: err.message });
            }
            cartModel.commit((err) => {
              if (err) {
                cartModel.rollBack();
                console.error(
                  "Error while commiting the cart quantity update transaction: ",
                  err.message,
                );
                return res.status(500).json({
                  success: false,
                  error: err.message,
                });
              }
              res.json({
                success: true,
                message: "Successfully updated the item quantity",
              });
            });
          },
        );
      });
    });
  });
};

const removeFromCart = (req, res) => {
  const { productId } = req.body;
  if (!productId || typeof productId !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid productId" });
  }
  cartModel.serialize(() => {
    cartModel.findByProductId(productId, (err, row) => {
      if (err) {
        console.error("Error finding the product: ", err.message);
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }
      if (!row) {
        console.log("Item does not exist in cart");
        return res.status(404).json({
          success: false,
          message: "Item does not exist in cart",
        });
      }
      cartModel.delete(productId, (err) => {
        if (err) {
          console.error("Error while deleting the product: ", err.message);
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }
        console.log("Item deleted successfully");
        res.json({
          success: true,
          message: "Item deleted from cart, successfully",
        });
      });
    });
  });
};
const clearCart = (req, res) => {
  cartModel.clear((err) => {
    if (err) {
      console.error("Error while clearing cart: ", err.message);
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
    console.log("Cart cleared");
    res.json({
      success: true,
      message: "Cart cleared Successfully",
    });
  });
};

export {
  getCartItems,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};
