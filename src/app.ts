import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/users";
import orderRoutes from "./routes/orders";
import cartRoutes from "./routes/cart";
import productRoutes from "./routes/products";
import adminRoutes from "./routes/admin";

dotenv.config();

const app = express();
const PORT = process.env.port || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(express.json);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_req, res) => {
  res.send("E-commerce backend is running");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
