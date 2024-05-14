import React from "react";
import { usePDF } from "react-to-pdf";

const reports = () => {
  const date = new Date();
  //change to format 10-June-2021
  // remove day and time
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${date.getDate()}-${
    monthNames[date.getMonth()]
  }-${date.getFullYear()}`;

  const { toPDF, targetRef } = usePDF({
    filename: `${formattedDate}InventoryReport.pdf`,
  });
  return (
    <div>
      <button onClick={() => toPDF()}>Download PDF</button>
      <div ref={targetRef}>Content to be generated to PDF</div>
    </div>
  );
};

export default reports;
