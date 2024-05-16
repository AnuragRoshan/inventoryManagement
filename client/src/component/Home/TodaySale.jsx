import React from "react";

const TodaySale = () => {
  return (
    <div
      className="dash-box"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="sales-head">Todays</div>
      <div className="total-sales">
        <div className="sales">
          <div className="sales-subhead">Sales</div>
          <div className="sales-cost"> $10.45K</div>
        </div>
        <div className="sales">
          <div className="sales-subhead">Orders Recieved</div>
          <div className="sales-cost"> 350</div>
        </div>
        <div className="sales">
          <div className="sales-subhead">Orders Delivered</div>
          <div className="sales-cost"> 237</div>
        </div>
        <div className="sales" style={{ border: "none" }}>
          <div className="sales-subhead">Profit</div>
          <div className="sales-cost"> $2.3k</div>
        </div>
      </div>
    </div>
  );
};

export default TodaySale;
