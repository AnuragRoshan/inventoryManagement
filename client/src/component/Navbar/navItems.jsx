import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavItems = ({ user }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const location = useLocation();

  useEffect(() => {
    // Extract the first segment of the pathname
    const pathSegments = location.pathname.split("/");
    const firstSegment = pathSegments[1] || "/";
    setActiveItem(firstSegment);
  }, [location]);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="nav-top">
      <Link
        to="/"
        className={`nav-items ${activeItem === "dashboard" ? "active" : ""}`}
        onClick={() => handleItemClick("dashboard")}
      >
        <div>
          <i className="fa-solid fa-table-columns"></i>
        </div>
        <div className="nav-list">Dashboard</div>
      </Link>
      <div className="verticle-bar">|</div>
      <Link
        to="/employee"
        className={`nav-items ${activeItem === "employee" ? "active" : ""}`}
        onClick={() => handleItemClick("employee")}
      >
        <div>
          <i className="fa-solid fa-user-tie"></i>
        </div>
        <div className="nav-list">Employee</div>
      </Link>
      <div className="verticle-bar">|</div>
      <Link
        to="/inventory"
        className={`nav-items ${activeItem === "inventory" ? "active" : ""}`}
        onClick={() => handleItemClick("inventory")}
      >
        <i className="fa-solid fa-boxes-stacked"></i>
        <div className="nav-list">Inventory</div>
      </Link>
      <div className="verticle-bar">|</div>
      <Link
        to="/departments"
        className={`nav-items ${activeItem === "departments" ? "active" : ""}`}
        onClick={() => handleItemClick("departments")}
      >
        <i className="fa-solid fa-users-viewfinder"></i>
        <div className="nav-list">Departments</div>
      </Link>
      <div className="verticle-bar">|</div>
      <Link
        to="/history"
        className={`nav-items ${activeItem === "history" ? "active" : ""}`}
        onClick={() => handleItemClick("history")}
      >
        <i class="fa-solid fa-earth-asia"></i>
        <div className="nav-list">History</div>
      </Link>
      <div className="verticle-bar">|</div>
      <Link
        to="/reports"
        className={`nav-items ${activeItem === "reports" ? "active" : ""}`}
        onClick={() => handleItemClick("reports")}
      >
        <i className="fa-regular fa-chart-bar"></i>
        <div className="nav-list">Reports</div>
      </Link>
    </div>
  );
};

export default NavItems;
