# 🛒 E-Commerce API System

A robust, production-ready backend built with **Node.js**, **Express**, and **SQLite3**. This system provides a comprehensive API for managing product catalogs, persistent shopping carts, and a transactional ordering system.

---

## 🚀 Key Features

- **Layered Architecture:** Strict separation of concerns using the **Model-Controller-Route** pattern for high maintainability.
- **Persistent Cart:** A database-backed shopping cart that remains intact across page refreshes and sessions.
- **Transactional Orders:** Uses **SQL Transactions (BEGIN/COMMIT/ROLLBACK)** to ensure data integrity during the checkout process.
- **Stock Validation:** Automated real-time checks to prevent "over-selling" items that are out of stock.
- **Search & Discovery:** Partial-match search functionality using SQL `LIKE` queries for a seamless user experience.
- **Custom Middleware:** Dedicated middleware layer for request validation and error handling.
- **Validation & Security:** Robust input validation to handle invalid requests (e.g., negative prices or missing fields) and CORS enabled for frontend integration.
- **Environment Config:** Separate `env/` setup for easy environment variable management.

---

## 🛠️ Tech Stack

| Layer          | Technology                                   |
| -------------- | -------------------------------------------- |
| **Runtime**    | Node.js (ES Modules)                         |
| **Framework**  | Express.js                                   |
| **Database**   | SQLite3                                      |
| **Middleware** | CORS, Express JSON Parser, Custom Validators |
| **Testing**    | Postman / Thunder Client                     |

---

## 📂 Project Structure

```text
ECommerceBackendAPI/
├── config/             # Database connection & SQLite setup
├── controllers/        # Request handling & business logic
├── database/           # SQLite database files
├── env/                # Environment variable configuration
├── middlewares/        # Custom middleware (validation, error handling)
├── models/             # SQL queries & database schema methods
├── routes/             # API route definitions
├── app.js              # Main entry point & middleware registration
├── package.json        # Project metadata & scripts
├── package-lock.json   # Dependency lock file
├── .gitignore          # Git ignored files
├── README.md           # Documentation
└── seed.js             # Seed the database with example data.
```

---

## ⚙️ Setup & Installation

### 1. Clone & Install

```bash
git clone https://github.com/thecreatorzx/ECommerceBackendAPI.git
cd ECommerceBackendAPI
npm install
```

### 2. Environment Setup

Configure your environment variables inside the `env/` folder as required before starting the server. (For now there is no need as it contains only the port variable.)

### 3. Running the Server

```bash
npm start
```

The API will be accessible at `http://localhost:5000`.

---

## 📡 API Endpoints

### 📦 Product Endpoints

| Method  | Endpoint                | Description                             |
| ------- | ----------------------- | --------------------------------------- |
| `GET`   | `/product`              | Fetch all products in the catalog       |
| `GET`   | `/product/:id`          | Get details for a specific product      |
| `GET`   | `/product/search?q=...` | Search products by name (partial match) |
| `POST`  | `/product`              | Add a new product (Admin)               |
| `PATCH` | `/product/price`        | Update a product's price                |
| `PATCH` | `/product/stock`        | Manually update stock levels            |

### 🛒 Cart Endpoints

| Method   | Endpoint    | Description                                 |
| -------- | ----------- | ------------------------------------------- |
| `GET`    | `/cart`     | Retrieve all items in the current cart      |
| `POST`   | `/cart`     | Add a product to the cart / Update quantity |
| `DELETE` | `/cart/:id` | Remove a specific item from the cart        |
| `DELETE` | `/cart`     | Clear the entire cart                       |

### 🧾 Order Endpoints

| Method | Endpoint | Description                               |
| ------ | -------- | ----------------------------------------- |
| `POST` | `/order` | Place an order (Triggers stock deduction) |

---

## 🧪 Testing with Postman / Thunder Client

1. **Product Discovery:** Use `GET /product/search?q=iPhone` to verify partial-match search filters correctly.
2. **Constraint Validation:** Attempt to add a product with a negative price — server should respond with `400 Bad Request`.
3. **Atomic Checkout:**
   - Place an order for a quantity that exists. Verify stock is deducted.
   - Place an order for a quantity exceeding stock. Verify the transaction rolls back and no order is created.

---

## ✅ Final Submission Checklist

- [x] CORS enabled for cross-origin requests.
- [x] Layered Architecture (Routes ➔ Controllers ➔ Models).
- [x] Custom Middlewares for validation and error handling.
- [x] Database Transactions implemented for stock updates.
- [x] Environment configuration via `env/` folder.
- [x] `"type": "module"` configured in `package.json`.

---

## 👤 Author

**MOHD SAAD** — [@thecreatorzx](https://github.com/thecreatorzx)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-webdevmsaad-blue?logo=linkedin)](https://www.linkedin.com/in/webdevmsaad/)
[![Twitter](https://img.shields.io/badge/Twitter-@webdevmsaad-1DA1F2?logo=twitter)](https://twitter.com/webdevmsaad)
