import React from "react";
import TotalSales from "../Home/TotalSales";
import TotalOrders from "../Home/TotalOrders";
import TodaySale from "../Home/TodaySale";
import Inventory from "../Home/Inventory";
import Orders from "../Home/Orders";
import StockList from "../Inventory/StockList";

const ReportComponent = () => {
  return (
    <div className="report-top">
      <div className="report-head">ALOTHAIM</div>
      <div className="report-detail">
        Email : wecare@othaimmarkets.com <br />
        Contact : 920000702 <br />
        Address : Arabia Rabwa Eastern Ring Road, Riyadh, Ar Riyad, 11531
      </div>
      <div className="data-report">
        <div className="sales-report">
          <div className="sales-section">
            <TotalSales />
          </div>
          <div className="order-count-section">
            <TotalOrders />
          </div>
        </div>
        <div
          className="today-data"
          style={{ width: "96%", marginBlockStart: "0.5rem" }}
        >
          <TodaySale />
        </div>
        <div
          className="today-data"
          style={{ width: "96%", marginBlockStart: "0.5rem" }}
        >
          <Inventory />
        </div>
        <div
          className="today-data"
          style={{ width: "96%", marginBlockStart: "0.5rem" }}
        >
          <Orders />
        </div>
        <div
          className="today-data"
          style={{
            width: "96%",
            marginBlockStart: "0.5rem",
            marginInline: "auto",
          }}
        >
          <StockList />
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
