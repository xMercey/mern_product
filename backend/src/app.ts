import express from "express"

const app = express();

app.use(express.json());
app.use("/api/products", (_req, res) => {
    res.send("product route");
});
export default app;

