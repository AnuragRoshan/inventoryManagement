import React from "react";

const TotalOrders = () => {
  return (
    <div className="dash-box">
      <div className="sales-data">
        <div className="sales-head">Total Orders Completed</div>
        <div className="sales-subhead"> In Last 24 hrs</div>
        <div className="costs" style={{ marginBlockStart: "0.5rem" }}>
          <span>
            <i class="fa-solid fa-truck-fast"></i>
          </span>
          <div className="sales-cost">1345 </div>
          <div className="orders">Orders</div>
        </div>
      </div>
    </div>
  );
};

export default TotalOrders;
