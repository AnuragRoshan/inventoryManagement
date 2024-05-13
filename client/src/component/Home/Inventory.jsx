import React from "react";

const Inventory = () => {
  return (
    <div
      className="dash-box"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="sales-head">Inventory</div>
      <div className="total-sales">
        <div className="sales">
          <div className="sales-subhead">Next Month Inventory</div>
          <div className="sales-cost"> 2345</div>
        </div>
        <div className="sales">
          <div className="sales-subhead">Stocked Value</div>
          <div className="sales-cost"> $674K</div>
        </div>
        <div className="sales">
          <div className="sales-subhead">Product Variety</div>
          <div className="sales-cost"> 145</div>
        </div>
        <div className="sales" style={{ border: "none" }}>
          <div className="sales-subhead">Inventory Age</div>
          <div className="sales-cost"> 15 days</div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
