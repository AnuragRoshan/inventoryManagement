import React, { useEffect, useState } from "react";
import "./home.css";
import TotalSales from "../../component/Home/TotalSales";
import TotalOrders from "../../component/Home/TotalOrders";
import TodaySale from "../../component/Home/TodaySale";
import Charts from "../../assets/charts/lineChart";
import BarChart from "../../assets/charts/barChart";
import Inventory from "../../component/Home/Inventory";
import Orders from "../../component/Home/Orders";
// import PolarChart from "../../assets/charts/polarChart";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="load">
        <div className="loader"></div>
        <div className="loadingcap">
          Loading Beautiful Inventory Management Experience For You
        </div>
      </div>
    );
  }
  return (
    <div className="home-top">
      <div className="home-head">Dashboard</div>
      <div className="totals-sales">
        <div className="sales-section">
          <TotalSales />
        </div>
        <div className="order-count-section">
          <TotalOrders />
        </div>
      </div>
      <div className="today-data">
        <TodaySale />
      </div>
      <div className="sales-graph graph-big">
        <Charts />
      </div>
      <div className="sales-graph graph-big">
        <BarChart />
      </div>
      <div className="today-data">
        <Inventory />
      </div>
      <div className="today-data">
        <Orders />
      </div>
    </div>
  );
};

export default Home;
