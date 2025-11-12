


import axios from "axios";
import Product from "../models/product.js";

export const fetchAndStoreProducts = async (req, res) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");

    const clothingProducts = data.filter(
      (item) =>
        item.category === "men's clothing" || item.category === "women's clothing"
    );

    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(clothingProducts);
      console.log("✅ Clothing products fetched and stored in MongoDB");
    }

    res.json({
      message: "Clothing products retrieved successfully",
      count: clothingProducts.length,
    });
  } catch (error) {
    console.error("❌ Error fetching clothing products:", error.message);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $or: [{ category: "men's clothing" }, { category: "women's clothing" }],
    });
    res.json(products);
  } catch (error) {
    console.error("❌ Error retrieving products:", error.message);
    res.status(500).json({ message: "Error retrieving products" });
  }
};
