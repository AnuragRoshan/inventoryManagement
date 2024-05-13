import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar/navbar";
import Home from "./Page/Home/Home";
import Employee from "./Page/Employee/employee";
import Sales from "./Page/Sales/sales";
import Reports from "./Page/Reports/reports";
import Department from "./Page/Department/department";
import Inventory from "./Page/Inventory/inventory";
import AddEmployee from "./component/Employee/AddEmployee";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/dashboard" element={<Home />} />
          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/employee/addEmployee" element={<AddEmployee />} />
          <Route exact path="/sales" element={<Sales />} />
          <Route exact path="/reports" element={<Reports />} />
          <Route exact path="/departments" element={<Department />} />
          <Route exact path="/inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
