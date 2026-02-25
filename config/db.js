import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// defining missing methods
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../database/shop.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Database error: ", err);
  else console.log("SQLite Connected!");
});

db.run("PRAGMA foreign_keys = ON", (err) => {
  if (err) console.error("Failed to enable foreign keys:", err.message);
});

db.serialize(() => {
  // 1- products   table
  db.run(
    `CREATE TABLE IF NOT EXISTS products(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    )`,
    (err) => {
      if (err) console.error("Error creating products table: ", err);
      else console.log("Table products exist.");
    },
  );
  // 2- cart table.
  db.run(
    `CREATE TABLE IF NOT EXISTS cart(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL UNIQUE,
      quantity INTEGER NOT NULL,
      FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
    )`,
    (err) => {
      if (err) console.error("Error creating cart table: ", err);
      else console.log("Table cart exist with foreign key to product ID.");
    },
  );
  // 3  - orders table
  db.run(
    `CREATE TABLE IF NOT EXISTS orders(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total_amount REAL NOT NULL,
      time DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) console.error("Error creating orders table: ", err);
      else console.log("Table orders exist.");
    },
  );
});

export default db;
