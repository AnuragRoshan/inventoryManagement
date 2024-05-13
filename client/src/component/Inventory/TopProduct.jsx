import React from "react";

const TopProduct = () => {
  return (
    <div
      className="dash-box"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="sales-head">Top</div>
      <div className="sales-subhead">Last 30 days</div>
      <div className="total-sales">
        <div className="sales">
          <div className="sales-subhead">Seller Product</div>
          <div className="sales-cost">4k TV</div>
        </div>
        <div className="sales">
          <div className="sales-subhead">Growth Product</div>
          <div className="sales-cost">X Box </div>
        </div>
        <div className="sales">
          <div className="sales-subhead"> Margin Product</div>
          <div className="sales-cost"> Bed Frame</div>
        </div>
        <div className="sales" style={{ border: "none" }}>
          <div className="sales-subhead">Demand Product</div>
          <div className="sales-cost"> $5.23K</div>
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
