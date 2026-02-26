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
├── env/                # Environment variable configuration (port, etc.)
├── middlewares/        # Custom middleware (validation, error handling)
├── models/             # SQL queries & database schema methods
├── routes/             # API route definitions
├── app.js              # Main entry point & middleware registration
├── seed.js             # Script to seed the database with example data
├── package.json        # Project metadata & scripts
├── package-lock.json   # Dependency lock file
├── .gitignore          # Git ignored files
└── README.md           # Documentation
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

Configure your environment variables inside the `env/` folder as needed. Currently it only contains the port variable — no extra setup required to get started.

### 3. Seed the Database

Populate the database with example products:

```bash
node seed.js
```

### 4. Start the Server

```bash
npm start
```

The API will be accessible at `http://localhost:5000`.

---

## 📡 API Endpoints

### 📦 Products Endpoints

| Method  | Endpoint                 | Description                             |
| ------- | ------------------------ | --------------------------------------- |
| `GET`   | `/products`              | Fetch all products in the catalog       |
| `GET`   | `/products/:id`          | Get details for a specific product      |
| `GET`   | `/products/search?q=...` | Search products by name (partial match) |
| `POST`  | `/products`              | Add a new product (Admin)               |
| `PATCH` | `/products/price`        | Update a product's price                |
| `PATCH` | `/products/stock`        | Manually update stock levels            |

**Example — Update Price:**

```json
PATCH /products/price
{ "id": 1, "price": 85000 }
```

### 🛒 Cart Endpoints

| Method   | Endpoint    | Description                                 |
| -------- | ----------- | ------------------------------------------- |
| `GET`    | `/cart`     | Retrieve all items in the current cart      |
| `POST`   | `/cart`     | Add a product to the cart / Update quantity |
| `DELETE` | `/cart/:id` | Remove a specific item from the cart        |
| `DELETE` | `/cart`     | Clear the entire cart                       |

**Example — Add to Cart:**

```json
POST /cart
{ "productId": 1, "quantity": 1 }
```

### 🧾 Orders Endpoints

| Method | Endpoint  | Description                               |
| ------ | --------- | ----------------------------------------- |
| `POST` | `/orders` | Place an order (triggers stock deduction) |

**Example — Place Order:**

```json
POST /orders
{ "items": [{ "productId": 1, "quantity": 1 }] }
```

---

## 🧪 Testing with Postman / Thunder Client

1. **Product Discovery:** `GET /products/search?q=iPhone` — verifies partial-match search filters correctly.
2. **Constraint Validation:** Attempt to add a product with a negative price — server should respond with `400 Bad Request`.
3. **Atomic Checkout:**
   - Place an order for a quantity that exists → verify stock is deducted.
   - Place an order exceeding available stock → verify the transaction rolls back and no order is created.

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
