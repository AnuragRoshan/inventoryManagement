import React from "react";

const EmployeeData = () => {
  return (
    <div
      className="dash-box"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="sales-head">Employee Data</div>
      <div className="total-sales">
        <div className="sales">
          <div className="sales-subhead">Total Employee</div>
          <div className="sales-cost"> 426</div>
        </div>
        <div className="sales">
          <div className="sales-subhead">Annual Salary Spent</div>
          <div className="sales-cost"> $16,522K</div>
        </div>
        <div className="sales">
          <div className="sales-subhead">Average Salary</div>
          <div className="sales-cost"> $38.7K</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeData;
