import React, { useState, useEffect } from "react";
import axios from "axios";

const PredictStock = () => {
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState("");

  // Fetch product options from the backend on component mount

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/products/list"
        );
        console.log("Products:", response.data);
        setProductOptions(response.data);
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
    const product_name = productOptions.find(
      (x) => x.product_id === selectedProduct
    ).product_name;
    setSelectedProductName(product_name);
    let numericPart = selectedProduct.match(/\d+/);
    console.log("Product:", numericPart[0]);
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/stock/predict",
          {
            product: numericPart,
            start: startDate,
            end: endDate,
          }
        );
        // setAfterLoadProduct(
        //   productOptions.find(
        //     (x) => x.product_id === "Product_)" + numericPart[0]
        //   ).product_name
        // );
        setPredictionResult(response.data.total_sum);
      } catch (error) {
        console.error("Error predicting inventory:", error);
      }

      // Set loading to false after 3 seconds
      setLoading(false);
    }, 5000);
  };

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
                {productOptions.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.product_name.slice(0, 22)}
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
      {loading ? (
        <>
          <div className="loader-pred"></div>
          <div>Analyzing Inventory</div>
        </>
      ) : (
        predictionResult && (
          <div className="prediction-result">
            <p>
              You have to stock{" "}
              <span className="sales-cost">{predictionResult}</span> units of{" "}
              <span style={{ fontWeight: "bold" }}>{selectedProductName}</span>
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default PredictStock;
