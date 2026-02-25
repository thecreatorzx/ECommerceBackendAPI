import db from "../config/db.js";

const CartModel = {
  beginTxn: () => {
    db.run("BEGIN TRANSACTION");
  },
  rollBack: () => {
    db.run("ROLLBACK");
  },
  commit: (callback) => {
    db.run("COMMIT", callback);
  },
  serialize: (callback) => {
    db.serialize(callback);
  },
  findAll: (callback) => {
    const sql = "SELECT * FROM cart";
    db.all(sql, [], callback);
  },
  findByProductId: (productId, callback) => {
    const sql = "SELECT * FROM cart WHERE productId = ?";
    db.get(sql, [productId], callback);
  },
  create: (productId, callback) => {
    const sql = "INSERT INTO cart (productId, quantity) VALUES (?, ?)";
    db.run(sql, [productId, 1], callback);
  },
  updateQuantity: (data, callback) => {
    const { productId, quantity } = data;
    const sql = "UPDATE cart SET quantity = ? WHERE productId = ?";
    db.run(sql, [quantity, productId], callback);
  },
  delete: (productId, callback) => {
    const sql = "DELETE FROM cart WHERE productId = ?";
    db.run(sql, [productId], callback);
  },
  clear: (callback) => {
    const sql = "DELETE FROM cart";
    db.run(sql, [], callback);
  },
};

export default CartModel;
