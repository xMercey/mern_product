import express from "express";
import cors from "cors";
import { productRouter } from "./route/ProductRoutes";

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/products", productRouter);

export default app;