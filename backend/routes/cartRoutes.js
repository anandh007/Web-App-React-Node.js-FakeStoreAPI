import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/add", addToCart);
router.post("/update", updateCartItem);
router.post("/remove", removeCartItem);

export default router;
