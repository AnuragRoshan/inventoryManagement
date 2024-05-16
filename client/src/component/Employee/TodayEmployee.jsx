import React from "react";

const TodayEmployee = () => {
  return (
    <div
      className="dash-box"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="sales-head">Todays</div>
      <div className="total-sales">
        <div className="sales">
          <div className="sales-subhead">New Hire</div>
          <div className="sales-cost"> 4 </div>
        </div>
        <div className="sales">
          <div className="sales-subhead">Employee On Leave</div>
          <div className="sales-cost"> 37</div>
        </div>
        <div className="sales">
          <div className="sales-subhead">Employee Absent</div>
          <div className="sales-cost"> 3</div>
        </div>
      </div>
    </div>
  );
};

export default TodayEmployee;
