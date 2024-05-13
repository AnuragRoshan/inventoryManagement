import React, { useEffect, useRef, useState } from "react";

const employeesData = [
  {
    Name: "John Doe",
    Phone: "123-456-7890",
    Department: "IT",
    Role: "Software Engineer",
    Salary: "$80,000",
    DateOfJoining: "2022-01-15",
  },
  {
    Name: "Emma Smith",
    Phone: "456-789-0123",
    Department: "HR",
    Role: "HR Manager",
    Salary: "$100,000",
    DateOfJoining: "2021-11-20",
  },
  {
    Name: "Michael Johnson",
    Phone: "789-012-3456",
    Department: "Finance",
    Role: "Financial Analyst",
    Salary: "$90,000",
    DateOfJoining: "2022-03-10",
  },
  {
    Name: "Sophia Williams",
    Phone: "012-345-6789",
    Department: "Operations",
    Role: "Operations Manager",
    Salary: "$95,000",
    DateOfJoining: "2021-09-05",
  },
  {
    Name: "Ethan Brown",
    Phone: "234-567-8901",
    Department: "IT",
    Role: "Software Developer",
    Salary: "$75,000",
    DateOfJoining: "2022-02-28",
  },
  {
    Name: "Olivia Jones",
    Phone: "567-890-1234",
    Department: "HR",
    Role: "HR Assistant",
    Salary: "$60,000",
    DateOfJoining: "2022-04-15",
  },
  {
    Name: "Noah Davis",
    Phone: "890-123-4567",
    Department: "Finance",
    Role: "Financial Manager",
    Salary: "$110,000",
    DateOfJoining: "2021-08-20",
  },
  {
    Name: "Ava Miller",
    Phone: "123-456-7890",
    Department: "Operations",
    Role: "Operations Assistant",
    Salary: "$55,000",
    DateOfJoining: "2021-12-10",
  },
  {
    Name: "William Wilson",
    Phone: "456-789-0123",
    Department: "IT",
    Role: "Software Engineer",
    Salary: "$85,000",
    DateOfJoining: "2022-01-05",
  },
  {
    Name: "Isabella Taylor",
    Phone: "789-012-3456",
    Department: "HR",
    Role: "HR Specialist",
    Salary: "$70,000",
    DateOfJoining: "2022-03-20",
  },
  {
    Name: "James Anderson",
    Phone: "012-345-6789",
    Department: "Finance",
    Role: "Financial Analyst",
    Salary: "$95,000",
    DateOfJoining: "2021-09-15",
  },
  {
    Name: "Mia Martinez",
    Phone: "234-567-8901",
    Department: "Operations",
    Role: "Operations Manager",
    Salary: "$100,000",
    DateOfJoining: "2022-02-28",
  },
  {
    Name: "Benjamin Hernandez",
    Phone: "567-890-1234",
    Department: "IT",
    Role: "Software Developer",
    Salary: "$80,000",
    DateOfJoining: "2022-04-15",
  },
  {
    Name: "Amelia Nelson",
    Phone: "890-123-4567",
    Department: "HR",
    Role: "HR Assistant",
    Salary: "$65,000",
    DateOfJoining: "2021-08-20",
  },
  {
    Name: "Daniel White",
    Phone: "123-456-7890",
    Department: "Finance",
    Role: "Financial Manager",
    Salary: "$115,000",
    DateOfJoining: "2021-12-10",
  },
  {
    Name: "Sophia Brown",
    Phone: "456-789-0123",
    Department: "Operations",
    Role: "Operations Assistant",
    Salary: "$60,000",
    DateOfJoining: "2022-01-05",
  },
  {
    Name: "Ethan Wilson",
    Phone: "789-012-3456",
    Department: "IT",
    Role: "Software Engineer",
    Salary: "$90,000",
    DateOfJoining: "2022-03-20",
  },
  {
    Name: "Olivia Taylor",
    Phone: "012-345-6789",
    Department: "HR",
    Role: "HR Specialist",
    Salary: "$75,000",
    DateOfJoining: "2021-09-15",
  },
  {
    Name: "Noah Anderson",
    Phone: "234-567-8901",
    Department: "Finance",
    Role: "Financial Analyst",
    Salary: "$100,000",
    DateOfJoining: "2022-02-28",
  },
  {
    Name: "Ava Martinez",
    Phone: "567-890-1234",
    Department: "Operations",
    Role: "Operations Manager",
    Salary: "$105,000",
    DateOfJoining: "2022-04-15",
  },
  {
    Name: "William Hernandez",
    Phone: "890-123-4567",
    Department: "IT",
    Role: "Software Developer",
    Salary: "$85,000",
    DateOfJoining: "2021-08-20",
  },
  {
    Name: "Isabella Nelson",
    Phone: "123-456-7890",
    Department: "HR",
    Role: "HR Assistant",
    Salary: "$70,000",
    DateOfJoining: "2021-12-10",
  },
  {
    Name: "James White",
    Phone: "456-789-0123",
    Department: "Finance",
    Role: "Financial Manager",
    Salary: "$120,000",
    DateOfJoining: "2022-01-05",
  },
  {
    Name: "Mia Brown",
    Phone: "789-012-3456",
    Department: "Operations",
    Role: "Operations Assistant",
    Salary: "$65,000",
    DateOfJoining: "2022-03-20",
  },
  {
    Name: "Benjamin Wilson",
    Phone: "012-345-6789",
    Department: "IT",
    Role: "Software Engineer",
    Salary: "$95,000",
    DateOfJoining: "2021-09-15",
  },
  {
    Name: "Amelia Taylor",
    Phone: "234-567-8901",
    Department: "HR",
    Role: "HR Specialist",
    Salary: "$80,000",
    DateOfJoining: "2022-02-28",
  },
  {
    Name: "Daniel Anderson",
    Phone: "567-890-1234",
    Department: "Finance",
    Role: "Financial Analyst",
    Salary: "$105,000",
    DateOfJoining: "2022-04-15",
  },
  {
    Name: "Sophia Martinez",
    Phone: "890-123-4567",
    Department: "Operations",
    Role: "Operations Manager",
    Salary: "$110,000",
    DateOfJoining: "2021-08-20",
  },
  {
    Name: "Ethan Hernandez",
    Phone: "123-456-7890",
    Department: "IT",
    Role: "Software Developer",
    Salary: "$90,000",
    DateOfJoining: "2021-12-10",
  },
  {
    Name: "Olivia Nelson",
    Phone: "456-789-0123",
    Department: "HR",
    Role: "HR Assistant",
    Salary: "$75,000",
    DateOfJoining: "2022-01-05",
  },
  {
    Name: "Noah White",
    Phone: "789-012-3456",
    Department: "Finance",
    Role: "Financial Manager",
    Salary: "$125,000",
    DateOfJoining: "2022-03-20",
  },
  {
    Name: "Ava Brown",
    Phone: "012-345-6789",
    Department: "Operations",
    Role: "Operations Assistant",
    Salary: "$70,000",
    DateOfJoining: "2021-09-15",
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
            <th>Phone</th>
            <th>Department</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Date Of joining</th>
          </tr>
        </thead>
        <tbody>
          {employeesData.slice(0, visibleEmployees).map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.Name}</td>
              <td>{data.Phone}</td>
              <td>{data.Department}</td>
              <td>{data.Role}</td>
              <td>{data.Salary}</td>
              <td>{data.DateOfJoining}</td>
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
