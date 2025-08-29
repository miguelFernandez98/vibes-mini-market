import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./products.router";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
