import React, { useState, useEffect } from "react";
import "../Home/home.css";
import "./inventory.css";
import Charts from "../../assets/charts/lineChart";
import BarChart from "../../assets/charts/barChart";
import Inventory from "../../component/Home/Inventory";
import PredictStock from "../../component/Inventory/PredictStock";
import TopProduct from "../../component/Inventory/TopProduct";
import BuyerList from "../../component/Inventory/BuyerList";
import StockList from "../../component/Inventory/StockList";
import SupplierList from "../../component/Inventory/SupplierList";
// import PolarChart from "../../assets/charts/polarChart";

const inventory = () => {
  const [isLoading, setIsLoading] = useState(true);

  const customMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const customSales = [85, 93, 90, 102, 100, 78, 86, 93, 89, 93, 92, 103]; // Example sales data

  useEffect(() => {
    const randomTimeout = Math.floor(Math.random() * (5000 - 2000 + 1) + 2000); // Random number between 2000 and 5000
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, randomTimeout);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-top">
      {isLoading ? (
        <div className="load">
          <div className="loader"></div>
          <div className="loadingcap">Loading Data</div>
        </div>
      ) : (
        <>
          <div className="home-head">Inventory</div>
          <div className="today-data">
            <Inventory />
          </div>
          <div className="today-data">
            <PredictStock />
          </div>
          <div className="today-data">
            <TopProduct />
          </div>
          <div className="sales-graph graph-big">
            <BarChart />
          </div>
          <div className="today-data">
            <BuyerList />
          </div>
          <div className="sales-graph graph-big">
            <Charts customMonths={customMonths} customSales={customSales} />{" "}
          </div>
          <div className="today-data">
            <StockList />
          </div>
          <div className="today-data">
            <SupplierList />
          </div>
          <div className="sales-graph graph-big">
            <BarChart />
          </div>
        </>
      )}
    </div>
  );
};

export default inventory;
