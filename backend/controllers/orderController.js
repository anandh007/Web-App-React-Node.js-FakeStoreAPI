
import Order from "../models/orderModel.js";

export const markOrderAsPaid = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = "Paid";
    await order.save();

    res.json({ success: true, message: "Order updated to Paid", order });
  } catch (error) {
    console.error("❌ Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
