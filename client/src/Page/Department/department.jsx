import React, { useState, useEffect } from "react";
import "../Home/home.css";
import "../Employee/employee.css";
import "./department.css";
import MarketingDepartment from "../../component/Department/MarketingDepartment";

const department = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="load">
        <div className="loader"></div>
        <div className="loadingcap">Loading Data</div>
      </div>
    );
  }

  return (
    <div className="home-top">
      <div className="home-head">Departments</div>
      <div className="sales-dpartment">
        <MarketingDepartment />
      </div>
      <div className="sales-dpartment">Finance</div>
      <div className="sales-dpartment">Logistics</div>
    </div>
  );
};

export default department;
