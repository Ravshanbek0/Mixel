import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LikePRoducts.css"
import { Link } from "react-router-dom";

function LikeProducts({setLikeData}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token")
    try {
      const url = `https://ecommerce0003.pythonanywhere.com/action/liked/${id}/`;

      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload()

    } catch (error) {
    }
  };

  useEffect(() => {
    const fetchSavedProductDetails = async () => {
      const token = localStorage.getItem("token")

      try {
        // 1️⃣ Saqlangan mahsulotlar IDlarini olish
        const response = await axios.get("https://ecommerce0003.pythonanywhere.com/action/liked/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const productIds = response.data; // IDlar kelayotgan array

        // 2️⃣ Har bir mahsulot uchun alohida API so‘rov yuborish
        const productRequests = productIds.map((id) =>
          axios.get(`https://ecommerce0003.pythonanywhere.com/main/products/${id.id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        // 3️⃣ Barcha API so‘rovlarini bajarish
        const productResponses = await Promise.all(productRequests);

        // 4️⃣ Ma'lumotlarni arrayga yig‘ish
        const fullProducts = productResponses.map((res) => res.data);
        setProducts(fullProducts);
        setLikeData(fullProducts)

      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProductDetails()
  }, []);

  return (
    <div className="container">
      <h1 className="title">Сохраненные продукты</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : products.length === 0 ? (
        <p className="empty">No saved products yet!</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/card/${product?.id}`}><img src={`https://ecommerce0003.pythonanywhere.com/${product.img_main}`} alt={product.name} className="product-image" /></Link>
              <h2 className="product-name">{product?.product.name.slice(0, 50)}...</h2>
              <p className="product-price">{product?.product.price} cум</p>
              <button onClick={()=>{deleteProduct(product?.product.id)}} className="remove-btn">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default LikeProducts