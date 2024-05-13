import React, { useEffect, useRef, useState } from "react";

const supplierData = [
  {
    seller_name: "Tech Emporium",
    contact_person: "John Doe",
    email: "john.doe@techemporium.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Cityville, New York, USA",
    product_id: [
      "Product_1",
      "Product_2",
      "Product_3",
      "Product_4",
      "Product_6",
      "Product_8",
      "Product_9",
      "Product_10",
      "Product_11",
      "Product_12",
      "Product_19",
      "Product_20",
    ],
    category: "Electronics",
  },
  {
    seller_name: "Sneaker Haven",
    contact_person: "Sarah Smith",
    email: "sarah.smith@sneakerhaven.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Avenue, Townsville, Washington, USA",
    product_id: ["Product_5", "Product_7"],
    category: "Footwear",
  },
  {
    seller_name: "Artistic Supplies Co.",
    contact_person: "Michael Johnson",
    email: "michael.johnson@artisticsuppliesco.com",
    phone: "+1 (555) 789-0123",
    address: "789 Elm Street, Villageton, Florida, USA",
    product_id: ["Product_13", "Product_16"],
    category: "Art & Stationery",
  },
  {
    seller_name: "Organic Delights",
    contact_person: "Emily Brown",
    email: "emily.brown@organicdelights.com",
    phone: "+1 (555) 234-5678",
    address: "101 Pine Street, Farmville, Arizona, USA",
    product_id: ["Product_17", "Product_14"],
    category: "Groceries",
  },
  {
    seller_name: "Home Comforts Furniture",
    contact_person: "David Wilson",
    email: "david.wilson@homecomfortsfurniture.com",
    phone: "+1 (555) 345-6789",
    address: "321 Maple Avenue, Countrytown, California, USA",
    product_id: ["Product_15", "Product_18"],
    category: "Furniture",
  },
];

const SupplierList = () => {
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
      <div className="sales-head">Seller List</div>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Seller Name</th>
            <th>Category</th>
            <th>Person</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {supplierData.slice(0, visibleEmployees).map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.seller_name}</td>
              <td>{data.category}</td>
              <td>{data.contact_person}</td>
              <td>{data.email}</td>
              <td>{data.address}</td>
              <td style={{ width: "6rem" }}>{data.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleEmployees < supplierData.length && (
        <button onClick={handleLoadMore} className="loadmore">
          Load More
        </button>
      )}
    </div>
  );
};

export default SupplierList;
