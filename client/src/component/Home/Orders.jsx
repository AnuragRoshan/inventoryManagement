import React from "react";
import TodayOrderChart from "../../Page/Home/todayOrderChart";

const Orders = () => {
  return (
    <div className="dash-box">
      <div className="sales-data">
        <div className="sales-head">Orders</div>
        <div className="sales-subhead">Last 7 days</div>
        <div className="costs">
          <div className="sales-cost" style={{ fontSize: "4rem" }}>
            8324
          </div>
          {/* <div className="percent-increase">+9.2%</div> */}
        </div>
        <div>
          <span className="sale-increase">Orders </span>{" "}
          <span className="prev-day">
            Delivered worth{"  "}
            <span className="sales-cost" style={{ fontSize: "2rem" }}>
              $123.45K
            </span>
          </span>
        </div>
      </div>
      <div
        className="sales-data"
        style={{
          flex: "2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="sales-cost" style={{ fontSize: "4.5rem" }}>
          399
        </span>
        <span className="prev-day" style={{ textAlign: "center" }}>
          Products on the way to delivered
        </span>
      </div>
      <div className="tiny-graph">
        <TodayOrderChart />
      </div>
    </div>
  );
};

export default Orders;
