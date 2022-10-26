import express, { Router } from "express";
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProducts,
  deleteProducts,
} from "../controllers/ProductController";

const router: Router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductsById);
router.post("/products", createProduct);
router.patch("/products/:id", updateProducts);
router.delete("/products/:id", deleteProducts);

export default router;
