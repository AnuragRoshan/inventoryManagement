import React from "react";
import Charts from "../../assets/charts/lineChart.jsx";

const TotalSales = () => {
  // Define the custom arrays here
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

  return (
    <div className="dash-box">
      <div className="sales-data">
        <div className="sales-head">Total Sales & Costs</div>
        <div className="sales-subhead">Last 60 days</div>
        <div className="costs">
          <div className="sales-cost"> $250.45K</div>
          <div className="percent-increase">+9.2%</div>
        </div>
        <div>
          <span className="sale-increase">+15.2K </span>{" "}
          <span className="prev-day">vs Prev 60 days</span>
        </div>
      </div>
      <div className="tiny-graph">
        <Charts customMonths={customMonths} customSales={customSales} />
      </div>
    </div>
  );
};

export default TotalSales;
