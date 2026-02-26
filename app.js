import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { productRoutes } from "./routes/productRouter.js";
import { orderRoutes } from "./routes/orderRouter.js";
import { cartRoutes } from "./routes/cartRouter.js";
import productModel from "./models/productModel.js";

// import {} from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  productModel.findAll((err, rows) => {
    res.render("index", { products: rows || [] });
  });
});
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, (err) => {
  if (!err) console.log("App is running on port: ", PORT);
  else console.log("Error : ", err);
});
