import express from "express"
import cors from "cors";
import { productRouter } from "./route/ProductRoutes";

const app = express();

app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

app.use(express.json());
app.use("/api/products", productRouter);
export default app;

