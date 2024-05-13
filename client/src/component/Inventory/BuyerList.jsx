import React, { useEffect, useRef, useState } from "react";

const salesData = [
  {
    TransactionID: "1",
    Product: "Product 1",
    CustomerName: "John Doe",
    DateTime: "2022-01-15",
    Bill: "$80,000",
  },
  {
    TransactionID: "2",
    Product: "Product 2",
    CustomerName: "Emma Smith",
    DateTime: "2021-11-20",
    Bill: "$100,000",
  },
  {
    TransactionID: "3",
    Product: "Product 3",
    CustomerName: "Michael Johnson",
    DateTime: "2022-03-10",
    Bill: "$90,000",
  },

  {
    TransactionID: "4",
    Product: "Product 4",
    CustomerName: "Sophia Williams",
    DateTime: "2021-09-05",
    Bill: "$95,000",
  },
  {
    TransactionID: "5",
    Product: "Product 5",
    CustomerName: "Ethan Brown",
    DateTime: "2022-02-28",
    Bill: "$75,000",
  },
  {
    TransactionID: "6",
    Product: "Product 6",
    CustomerName: "Olivia Jones",
    DateTime: "2022-04-15",
    Bill: "$60,000",
  },
  {
    TransactionID: "7",
    Product: "Product 7",
    CustomerName: "Noah Davis",
    DateTime: "2021-08-20",
    Bill: "$110,000",
  },
];

const BuyerList = () => {
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
      <div className="sales-head">Sales List</div>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>TransactionID</th>
            <th>Product</th>
            <th>Customer Name</th>
            <th>Date and Time</th>
            <th>Bill</th>
          </tr>
        </thead>
        <tbody>
          {salesData.slice(0, visibleEmployees).map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.TransactionID}</td>
              <td>{data.Product}</td>
              <td>{data.CustomerName}</td>
              <td>{data.DateTime}</td>
              <td>{data.Bill}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleEmployees < salesData.length && (
        <button onClick={handleLoadMore} className="loadmore">
          Load More
        </button>
      )}
    </div>
  );
};

export default BuyerList;
