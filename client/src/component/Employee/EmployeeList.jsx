import React, { useEffect, useRef, useState } from "react";

const employeesData = [
  {
    firstName: "John",
    lastName: "Doe",
    emailAddress: "john.doe@example.com",
    password: "password123",
    role: "Manager",
    department: "Sales",
    contactNumber: "+1234567890",
    address: "123 Main Street",
    joiningDate: "2023-05-10T20:48:32.920Z",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    emailAddress: "jane.smith@example.com",
    password: "password456",
    role: "Supervisor",
    department: "Marketing",
    contactNumber: "+1987654321",
    address: "456 Elm Street",
    joiningDate: "2022-09-15T12:30:00.000Z",
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    emailAddress: "michael.johnson@example.com",
    password: "password789",
    role: "Sales Associate",
    department: "Human Resources",
    contactNumber: "+1122334455",
    address: "789 Oak Street",
    joiningDate: "2021-11-20T08:15:00.000Z",
  },
  {
    firstName: "Emily",
    lastName: "Brown",
    emailAddress: "emily.brown@example.com",
    password: "passwordabc",
    role: "Cashier",
    department: "Finance",
    contactNumber: "+1555666777",
    address: "987 Pine Street",
    joiningDate: "2020-07-01T18:00:00.000Z",
  },
  {
    firstName: "William",
    lastName: "Anderson",
    emailAddress: "william.anderson@example.com",
    password: "passwordxyz",
    role: "Manager",
    department: "Sales",
    contactNumber: "+1444333222",
    address: "246 Maple Street",
    joiningDate: "2019-03-05T10:45:00.000Z",
  },
  {
    firstName: "Olivia",
    lastName: "Martinez",
    emailAddress: "olivia.martinez@example.com",
    password: "pass123",
    role: "Supervisor",
    department: "Marketing",
    contactNumber: "+1777888999",
    address: "135 Walnut Street",
    joiningDate: "2018-01-15T14:20:00.000Z",
  },
  {
    firstName: "James",
    lastName: "Taylor",
    emailAddress: "james.taylor@example.com",
    password: "pass456",
    role: "Sales Associate",
    department: "Human Resources",
    contactNumber: "+1666777888",
    address: "753 Cedar Street",
    joiningDate: "2017-06-30T16:30:00.000Z",
  },
  {
    firstName: "Sophia",
    lastName: "Wilson",
    emailAddress: "sophia.wilson@example.com",
    password: "pass789",
    role: "Cashier",
    department: "Finance",
    contactNumber: "+1888999000",
    address: "369 Birch Street",
    joiningDate: "2016-04-25T22:00:00.000Z",
  },
  {
    firstName: "Alexander",
    lastName: "Garcia",
    emailAddress: "alexander.garcia@example.com",
    password: "password789",
    role: "Manager",
    department: "Sales",
    contactNumber: "+1999888777",
    address: "951 Oak Street",
    joiningDate: "2015-08-10T09:00:00.000Z",
  },
  {
    firstName: "Ava",
    lastName: "Lee",
    emailAddress: "ava.lee@example.com",
    password: "pass123",
    role: "Supervisor",
    department: "Marketing",
    contactNumber: "+1777666555",
    address: "357 Pine Street",
    joiningDate: "2014-02-28T13:45:00.000Z",
  },
  {
    firstName: "Ethan",
    lastName: "Rodriguez",
    emailAddress: "ethan.rodriguez@example.com",
    password: "pass456",
    role: "Sales Associate",
    department: "Human Resources",
    contactNumber: "+1555444333",
    address: "852 Elm Street",
    joiningDate: "2013-11-15T11:30:00.000Z",
  },
  {
    firstName: "Mia",
    lastName: "Lopez",
    emailAddress: "mia.lopez@example.com",
    password: "pass789",
    role: "Cashier",
    department: "Finance",
    contactNumber: "+1888777666",
    address: "468 Maple Street",
    joiningDate: "2012-07-20T08:15:00.000Z",
  },
  {
    firstName: "Logan",
    lastName: "Hernandez",
    emailAddress: "logan.hernandez@example.com",
    password: "passwordabc",
    role: "Manager",
    department: "Sales",
    contactNumber: "+1666555444",
    address: "753 Oak Street",
    joiningDate: "2011-04-10T18:45:00.000Z",
  },
  {
    firstName: "Charlotte",
    lastName: "Gonzalez",
    emailAddress: "charlotte.gonzalez@example.com",
    password: "passwordxyz",
    role: "Supervisor",
    department: "Marketing",
    contactNumber: "+1555333222",
    address: "246 Cedar Street",
    joiningDate: "2010-10-05T16:00:00.000Z",
  },
  {
    firstName: "Liam",
    lastName: "Perez",
    emailAddress: "liam.perez@example.com",
    password: "pass123",
    role: "Sales Associate",
    department: "Human Resources",
    contactNumber: "+1444222111",
    address: "951 Pine Street",
    joiningDate: "2009-12-01T09:30:00.000Z",
  },
];

const EmployeeList = () => {
  const [visibleEmployees, setVisibleEmployees] = useState(5);
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

  useEffect(() => {
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
        <tbody>
          {employeesData.slice(0, visibleEmployees).map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.firstName + " " + data.lastName}</td>
              <td>{data.department}</td>
              <td>{data.role}</td>
              <td>{data.contactNumber}</td>
              <td>{data.emailAddress}</td>
              <td>{data.joiningDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleEmployees < employeesData.length && (
        <button onClick={handleLoadMore} className="loadmore">
          Load More
        </button>
      )}
    </div>
  );
};

export default EmployeeList;
