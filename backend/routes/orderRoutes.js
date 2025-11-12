import express from "express";
import { markOrderAsPaid } from "../controllers/orderController.js";
import Order from "../models/orderModel.js";

const router = express.Router();


router.post("/mark-paid", markOrderAsPaid);


router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const query = userId === "guest" ? { user: null } : { user: userId };

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
