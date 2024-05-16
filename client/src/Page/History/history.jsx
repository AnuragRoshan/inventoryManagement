import React, { useState, useEffect } from "react";
import "../Home/home.css";
import "../Employee/employee.css";
import "../Department/department.css";
import MarketingDepartment from "../../component/Department/MarketingDepartment";
import OperationDepartment from "../../component/Department/OperationDepartment";
import axios from "axios";

const History = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    handleDepartmentClick();
    return () => clearTimeout(timer);
  }, []);

  const handleDepartmentClick = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getHistory");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

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
      <div className="home-head">History Of Applied Recommendations</div>
      {data && data.length > 0 ? (
        <table className="history-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Recommendation Name</th>
              <th>Recommendation Department</th>
              <th>Employee Name</th>
              <th>Employee Department</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.recomName}</td>
                <td>{item.recomDepart}</td>
                <td>{item.recomEmpName}</td>
                <td>{item.recomEmpDepart}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default History;
