import Cart from "../models/cart.js"
import Product from "../models/product.js";

export const getCart = async (req, res) => {
  const { userId } = req.params;
  const cart = await Cart.findOne({ userId }).populate("items.product");
  res.json(cart || { items: [] });
};

export const addToCart = async (req, res) => {
  const { userId, productId, qty } = req.body;

  let cart = await Cart.findOne({ userId });
  const product = await Product.findById(productId);
  if (!cart) cart = new Cart({ userId, items: [] });

  const existing = cart.items.find((i) => i.product.toString() === productId);
  if (existing) existing.qty += qty;
  else cart.items.push({ product: productId, qty });

  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
};

export const updateCartItem = async (req, res) => {
  const { userId, productId, qty } = req.body;
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ items: [] });

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (item) item.qty = qty;
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
};

export const removeCartItem = async (req, res) => {
  const { userId, productId } = req.body;
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ items: [] });

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
};
