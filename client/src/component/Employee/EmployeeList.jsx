import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const EmployeeList = () => {
  const [visibleEmployees, setVisibleEmployees] = useState(5);
  const [employeesData, setEmployeesData] = useState([]);
  const containerRef = useRef();

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setVisibleEmployees((prev) => prev + 5);
    }
  };

  const handleLoadMore = () => {
    setVisibleEmployees((prev) => prev + 5);
  };

  const getData = async () => {
    try {
      const apiUrl = `http://localhost:5000/employee/list`;
      const { data } = await axios.post(apiUrl);
      // console.log(data);
      //sort on the basis of time
      data.sort((a, b) => {
        return new Date(b.joiningDate) - new Date(a.joiningDate);
      });
      setEmployeesData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="employeeList-top" ref={containerRef}>
      <div className="sales-head">Employee List</div>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Date Of joining</th>
          </tr>
        </thead>
        {employeesData.length > 0 ? (
          <tbody>
            {employeesData.slice(0, visibleEmployees).map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.firstName + " " + data.lastName}</td>
                <td>{data.department}</td>
                <td>{data.role}</td>
                <td>{data.contactNumber}</td>
                <td>{data.username}</td>
                <td>{data.joiningDate.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          </tbody>
        )}
      </table>
      {employeesData.length > 0 && visibleEmployees < employeesData.length && (
        <button onClick={handleLoadMore} className="loadmore">
          Load More
        </button>
      )}
    </div>
  );
};

export default EmployeeList;
