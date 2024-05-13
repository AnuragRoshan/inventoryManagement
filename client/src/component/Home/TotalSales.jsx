import React from "react";
import Charts from "../../assets/charts/lineChart.jsx";

const TotalSales = () => {
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
          <span className="sale-increase">+5.2K </span>{" "}
          <span className="prev-day">vs Prev 60 days</span>
        </div>
      </div>
      <div className="tiny-graph">
        <Charts />
      </div>
    </div>
  );
};

export default TotalSales;
