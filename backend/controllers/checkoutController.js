
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/orderModel.js";

dotenv.config();
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export const createCheckoutSession = async (req, res) => {
  try {
    console.log("📦 Incoming checkout request:", req.body);

    const { cartItems, address, note, paymentMethod, userId } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

  const order = await Order.create({
  user: userId || null,
  cartItems: cartItems.map(item => ({
    productId: item.productId,
    title: item.title,
    price: item.price,
    qty: item.qty,
    image: item.image,
    description: item.description,
  })),
  totalAmount,
  paymentMethod,
  address,
  note,
  status: paymentMethod === "Stripe" ? "Pending" : "Paid",
  createdAt: new Date(),
});

    console.log("✅ Order saved successfully:", order._id);

    if (paymentMethod === "COD") {
      return res.status(200).json({
        success: true,
        message: "Order placed successfully (Cash on Delivery)",
        order,
      });
    }

    if (stripe && paymentMethod === "Stripe") {
      const line_items = cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.title },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `http://localhost:5173/success?orderId=${order._id}`,
        cancel_url: "http://localhost:5173/cart", 
      });

      console.log("💳 Stripe session created:", session.id);

      return res.json({ url: session.url });
    }

    res.status(400).json({ error: "Invalid payment method" });
  } catch (error) {
    console.error("❌ Checkout error:", error);
    res.status(500).json({ error: error.message });
  }
};
