import React, { useState, useEffect } from "react";
import axios from "axios";

const PredictStock = () => {
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);
  const [totalInventorySum, setTotalInventorySum] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch product options from the backend on component mount

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setProductOptions(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/predict-inventory", {
        product_id: selectedProduct,
        start_date: startDate,
        end_date: endDate,
      });
      setPredictionResult(response.data.predictions);
      setTotalInventorySum(response.data.total_inventory_sum);
    } catch (error) {
      console.error("Error predicting inventory:", error);
    }
    setLoading(false);
  };

  const product = [
    {
      productId: "ProductId_1",
      productName: "Product 1",
    },
    {
      productId: "ProductId_2",
      productName: "Product 2",
    },
    {
      productId: "ProductId_3",
      productName: "Product 3",
    },
    {
      productId: "ProductId_4",
      productName: "Product 4",
    },
    {
      productId: "ProductId_5",
      productName: "Product 5",
    },
  ];

  return (
    <div className="inventory-prediction-container">
      <h2>Predict Inventory</h2>

      <div className="inventory-prediction-inner">
        <div className="predictor">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="productName">Product Name:</label>
              <select
                id="productName"
                value={selectedProduct}
                onChange={handleProductChange}
                required
              >
                <option value="">Select Product</option>
                {product.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="startDate">Start Date (MM-DD-YYYY):</label>
              <input
                type="text"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="endDate">End Date (MM-DD-YYYY):</label>
              <input
                type="text"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Predict"}
            </button>
          </form>
        </div>
        <div className="predictor-image">
          <img
            src="https://ik.imagekit.io/i3divn77k/undraw_order_a_car_-3-tww%20(1).svg?updatedAt=1715521654179"
            alt=""
            srcset=""
          />
        </div>
      </div>
      {predictionResult && (
        <div className="prediction-result">
          <p>
            You have to stock{" "}
            <span className="sales-cost"> {predictionResult}</span> units of{" "}
            <span style={{ fontWeight: "bold" }}> {selectedProduct}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictStock;
