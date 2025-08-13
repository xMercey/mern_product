import express from "express"
import { productRouter } from "./route/ProductRoutes";

const app = express();

app.use(express.json());
app.use("/api/products", productRouter);
export default app;

