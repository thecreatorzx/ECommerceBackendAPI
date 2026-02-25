// src/seed.js
import ProductModel from "../models/productModel.js";

const categories = [
  // Phones & Accessories
  { name: "iPhone 15 Pro", price: 120000, stock: 15 },
  { name: "Samsung Galaxy S24 Ultra", price: 110000, stock: 10 },
  { name: "Google Pixel 8", price: 75000, stock: 8 },
  { name: "OnePlus 12", price: 65000, stock: 12 },
  { name: "MagSafe Charger", price: 4500, stock: 50 },

  // Laptops
  { name: "MacBook Pro M3", price: 160000, stock: 5 },
  { name: "Dell XPS 15", price: 140000, stock: 4 },
  { name: "HP Spectre x360", price: 115000, stock: 6 },
  { name: "ASUS ROG Zephyrus", price: 180000, stock: 3 },

  // Audio
  { name: "Sony WH-1000XM5 Headphones", price: 30000, stock: 20 },
  { name: "Bose QuietComfort Ultra", price: 35000, stock: 15 },
  { name: "Apple AirPods Pro (2nd Gen)", price: 24000, stock: 40 },
  { name: "JBL Flip 6 Speaker", price: 10000, stock: 25 },

  // Wearables
  { name: "Apple Watch Series 9", price: 41000, stock: 18 },
  { name: "Samsung Galaxy Watch 6", price: 30000, stock: 22 },
  { name: "Fitbit Charge 6", price: 15000, stock: 30 },

  // Gaming
  { name: "PlayStation 5 Console", price: 50000, stock: 7 },
  { name: "Xbox Series X", price: 48000, stock: 5 },
  { name: "Nintendo Switch OLED", price: 32000, stock: 10 },
];

console.log("Starting database seed...");

categories.forEach((product, index) => {
  ProductModel.create(product, function (err) {
    if (err) {
      console.error(`[Error] Failed to seed ${product.name}:`, err.message);
    } else {
      console.log(
        `[${index + 1}/${categories.length}] Seeded: ${product.name}`,
      );
    }
  });
});
