import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Product List</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {products.map((p) => (
          <div key={p._id} style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center"
          }}>
            <img src={p.image} alt={p.name} style={{ width: "150px", height: "150px", objectFit: "contain" }} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p style={{ fontSize: "13px", color: "#555" }}>{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
