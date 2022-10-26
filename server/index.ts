import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(ProductRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server udah jalan....");
});
