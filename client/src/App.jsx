import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [product, setProduct] = useState();
  const [status, setStatus] = useState("Loading...");
  async function getProductData() {
    try {
      const result = await axios.get("http://localhost:4001/products");
      setProduct(result.data.data);
    } catch (error) {
      setStatus(`Fetching Error...`);
    }
  }
  async function handleDelete(id) {
    await axios.delete(`http://localhost:4001/products/${id}`);
    await getProductData();
  }
  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {!product ? (
          <h1>{status}</h1>
        ) : (
          product.map(({ id, name, price, image, description }, index) => {
            return (
              <div className="product" key={index}>
                <div className="product-preview">
                  <img
                    src={image}
                    alt="some product"
                    width="350"
                    height="350"
                  />
                </div>
                <div className="product-detail">
                  <h1>Product name: {name}</h1>
                  <h2>Product price: {price} Baht</h2>
                  <p>Product description: {description}</p>
                </div>

                <button
                  className="delete-button"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  x
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
