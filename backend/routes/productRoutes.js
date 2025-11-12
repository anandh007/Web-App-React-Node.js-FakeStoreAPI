import express from "express";
import { fetchAndStoreProducts, getAllProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/fetch", fetchAndStoreProducts);
router.get("/", getAllProducts);

export default router;
