import React, { useState, useEffect } from "react";
import "../Home/home.css";
import "../Employee/employee.css";
import "./department.css";
import MarketingDepartment from "../../component/Department/MarketingDepartment";
import OperationDepartment from "../../component/Department/OperationDepartment";
import axios from "axios";

const department = ({ user }) => {
  const [loading, setLoading] = useState(true);

  const handleDepartmentClick = async (departmentName) => {
    // console.log(departmentName);
    // return;
    await axios
      .post("http://localhost:5000/saveRecom", { departmentName })
      .then((response) => {
        console.log(response);
        alert("Recommendation Applied Successfully");
        window.location.href("/history");
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

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
        <MarketingDepartment
          user={user}
          onDepartmentClick={handleDepartmentClick}
        />
      </div>
      <div className="sales-dpartment">
        <OperationDepartment
          user={user}
          onDepartmentClick={handleDepartmentClick}
        />
      </div>
    </div>
  );
};

export default department;
