import db from "../config/db.js";

const orderModel = {
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
    const sql = "SELECT * FROM orders";
    db.all(sql, [], callback);
  },
  findByProductId: (productId, callback) => {
    const sql = "SELECT * FROM orders WHERE id = ?";
    db.get(sql, [productId], callback);
  },
  create: (data, callback) => {
    const { total_amount } = data;
    const sql = "INSERT INTO orders (total_amount) values (?)";
    db.run(sql, [total_amount], callback);
  },
};

export default orderModel;
