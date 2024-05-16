import React, { useState, useEffect } from "react";
import "../Home/home.css";
import "./employee.css";
import EmployeeLineChart from "./employeeLineChart";
import BarChart from "../../assets/charts/barChart";
import EmployeeData from "../../component/Employee/EmployeeData";
import AddButton from "../../component/Employee/AddButton";
import TodayEmployee from "../../component/Employee/TodayEmployee";
import EmployeeList from "../../component/Employee/EmployeeList";
import EmployeeDepart from "./employeeDepartmentChart";

const Employee = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

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
      <div className="home-head">Employee</div>
      <div className="btn">
        <AddButton />
      </div>

      <div className="emp-list">
        <EmployeeList />
      </div>
      <div className="today-data">
        <EmployeeData />
      </div>
      <div className="sales-graph graph-big">
        <EmployeeLineChart />
      </div>
      <div className="today-data">
        <TodayEmployee />
      </div>
      <div className="sales-graph graph-big">
        <EmployeeDepart />
      </div>
    </div>
  );
};

export default Employee;
