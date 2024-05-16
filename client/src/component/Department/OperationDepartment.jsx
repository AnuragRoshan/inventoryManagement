import axios from "axios";
import React, { useEffect, useState } from "react";

const OperationDepartment = ({ user, onDepartmentClick }) => {
  const [predictedStock, setPredictedStock] = useState(null);
  const [currProductNum, setCurrProductNum] = useState(getRandomNumber(1, 20));
  //between 1 and 20
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function handleClick(e) {
    onDepartmentClick({
      recomEmpName: `${user.firstName} ${user.lastName}`,
      recomEmpDepart: user.department,
      recomDepart: "electronics",
      recomName: "Order",
    });
  }

  const productMap = [
    "",
    "Sony XBox",
    "Samsung Galaxy S22 Ultra",
    'Apple MacBook Pro 14"',
    "Amazon Echo (4th Gen)",
    "Nike Air Zoom Pegasus 38",
    "Canon EOS R6",
    "Nike Air Zoom Pegasus 38",
    "Canon EOS R6",
    'Apple MacBook Pro 14"',
    "Samsung Galaxy S22 Ultra",
    "Amazon Echo (4th Gen)",
    "HP OfficeJet Pro 9015e All-in-One Wireless Printer",
    "Faber-Castell 9000 Graphite Sketch Pencil Set - 12 Degrees",
    "Organic Brown Rice (5 lbs)",
    "IKEA MALM Bed Frame",
    "Sharpie Permanent Markers, Fine Point, Assorted Colors, 12 Pack",
    "Safeway Select Organic Milk (1 Gallon)",
    "IKEA EKTORP Sofa",
    "AmazonBasics AA Rechargeable Batteries (16-Pack)",
    "Sharp 55-Inch 4K Ultra HD Smart LED TV",
  ];

  // console.log(currProduct);

  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/stock/predict", {
        product: currProductNum,
        start: "06-01-2024",
        end: "06-30-2024",
      });
      setPredictedStock(response.data.total_sum);
      console.log(response.data.total_sum);
    } catch (error) {
      console.error("Error predicting inventory:", error);
    }
  };

  useEffect(() => {
    setCurrProductNum(getRandomNumber(1, 20));
    // console.log(currProductNum);
    getData();
  }, []);

  return (
    <div className="marketing-department-head">
      <div className="sales-head">Operations Department</div>
      <div className="sales-subhead" style={{ marginBlockStart: "0.5rem" }}>
        This section will suggest the operations strategies to maintain the size
        of stock and increase the sales
      </div>
      <div className="operation-image">
        <img
          src="https://ik.imagekit.io/i3divn77k/undraw_heavy_box_agqi.svg?updatedAt=1715779330926"
          alt=""
          srcset=""
        />
      </div>
      <div className="intreset-people">
        Our{" "}
        <span style={{ color: "#3811a3", fontSize: "2.8rem" }}>
          {" "}
          Machine Learning Model{" "}
        </span>{" "}
        is suggesting that you have to stock{" "}
        <span className="social">{predictedStock} </span>
        units of
        <span style={{ fontWeight: "1rem", fontWeight: "bold" }}>
          {" "}
          {productMap[currProductNum]}{" "}
        </span>
        for next month inventory stock , so it will not get out of stock.
      </div>

      <div className="intreset-people">
        <div>By clicking </div>
        <button onClick={handleClick} className="send-advertisement-button">
          Send Order
        </button>
        You will send the order right away
      </div>
    </div>
  );
};

export default OperationDepartment;
