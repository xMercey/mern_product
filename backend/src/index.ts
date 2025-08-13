import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config";

dotenv.config();


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
})