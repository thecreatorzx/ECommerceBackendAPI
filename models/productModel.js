import db from "../config/db.js";

const ProductModel = {
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
    const sql = "SELECT * FROM products";
    db.all(sql, [], callback);
  },
  findById: (id, callback) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    db.get(sql, [id], callback);
  },
  findAllById: (data, callback) => {
    const placeholders = data.map(() => "?").join(",");
    const sql = `SELECT * FROM products WHERE id IN (${placeholders})`;
    db.all(sql, data, callback);
  },
  search: (term, callback) => {
    const sql = "Select * FROM products WHERE UPPER(name) LIKE UPPER(?)";
    db.all(sql, [term], callback);
  },
  create: (data, callback) => {
    const { name, price, stock } = data;
    const sql = "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)";
    db.run(sql, [name, price, stock], callback);
  },
  updatePrice: (data, callback) => {
    const { id, price } = data;
    const sql = "UPDATE products SET price = ? WHERE id = ?";
    db.run(sql, [price, id], callback);
  },
  updateStock: (data, callback) => {
    const { id, stock } = data;
    const sql = "UPDATE products SET stock = ? WHERE id = ?";
    db.run(sql, [stock, id], callback);
  },
};

export default ProductModel;
