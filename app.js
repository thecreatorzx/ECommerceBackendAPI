import express from "express";
import { productRoutes } from "./routes/productRouter.js";
import { orderRoutes } from "./routes/orderRouter.js";
import { cartRoutes } from "./routes/cartRouter.js";
import cors from "cors";

// import {} from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, (err) => {
  if (!err) console.log("App is running on port: ", PORT);
  else console.log("Error : ", err);
});
