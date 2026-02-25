import ProductModel from "../models/productModel.js";

const addToProducts = (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }
  if (typeof price !== "number" || typeof stock !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Price and stock must be numbers" });
  }
  if (price < 0 || stock < 0) {
    return res.status(400).json({
      success: false,
      message: "Price and Stock cannot be negative",
    });
  }
  ProductModel.create({ name, price, stock }, function (err) {
    if (err) {
      console.error("Error adding products: ", err.message);
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log("Product added successfully");
    res.json({
      success: true,
      message: "Products added successfullly",
      productId: this.lastID,
    });
  });
};
const updatePrice = (req, res) => {
  const { id, price } = req.body;
  if (typeof price !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Price must be a number" });
  }
  if (price < 0)
    return res
      .status(400)
      .json({ success: false, message: "Price cannot be negative" });
  ProductModel.updatePrice({ id, price }, function (err) {
    if (err) {
      console.error("Error updating the price: ", err.message);
      return res.status(500).json({ success: false, error: err.message });
    }
    if (this.changes === 0)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    console.log("Successfully updated the price");
    res.json({
      success: true,
      message: "Price updated successfully",
    });
  });
};

const updateStock = (req, res) => {
  const { id, quantity } = req.body;
  if (typeof quantity !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Quantity must be a number" });
  }
  ProductModel.serialize(() => {
    ProductModel.beginTxn();
    ProductModel.findById(id, (err, product) => {
      if (err || !product) {
        ProductModel.rollBack();
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      const newCount = product.stock + quantity;
      if (newCount < 0) {
        ProductModel.rollBack();
        return res.status(400).json({
          success: false,
          message: "Insufficient stock. Operation aborted",
        });
      }

      ProductModel.updateStock({ id, stock: newCount }, function (err) {
        if (err) {
          ProductModel.rollBack();
          console.error("Error updating the stock: ", err.message);
          return res.status(500).json({ success: false, error: err.message });
        }
        ProductModel.commit((commitErr) => {
          if (commitErr) {
            return res
              .status(500)
              .json({ success: false, message: "Transaction failed" });
          }
          console.log("Successfully updated the stock");
          res.json({
            success: true,
            message: "Stock updated successfully",
            productId: id,
            newStock: newCount,
          });
        });
      });
    });
  });
};

const getAllProducts = (req, res) => {
  ProductModel.findAll((err, rows) => {
    if (err) {
      console.error("Error while fetching products: ", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log("Products Fetched Successfully");
    res.json({ success: true, count: rows.length, data: rows });
  });
};

const getProductById = (req, res) => {
  const { id } = req.params;
  ProductModel.findById(id, (err, row) => {
    if (err) {
      console.error("Error while fetching product with Id ", id, ": ", err);
      res.status(500).json({ success: false, error: err.message });
    }
    if (!row) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    console.log("Successfully Fetched with id: ", id);
    res.json({
      success: true,
      data: row,
    });
  });
};

const searchProducts = (req, res) => {
  const search = req.query.name || req.query.q;

  if (!search) {
    return res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }

  const queryParam = `%${search}%`;
  ProductModel.search(queryParam, (err, rows) => {
    if (err) {
      console.error("Error during search: ", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log("Successfully searched products");
    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  });
};

export {
  addToProducts,
  updatePrice,
  updateStock,
  getAllProducts,
  getProductById,
  searchProducts,
};
