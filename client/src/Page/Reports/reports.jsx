import React, { useState } from "react";
import { usePDF } from "react-to-pdf";
import "./report.css";
import ReportComponent from "../../component/Report/ReportComponent";

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const date = new Date();

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

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReportGenerated(true);
    }, 5000);
  };

  return (
    <div className="marketing-department-head" style={{ minHeight: "80vh" }}>
      <div className="report-pdf">
        {!reportGenerated ? (
          <button onClick={handleGenerateReport} disabled={loading}>
            {loading ? "Generating Report..." : "Generate Report"}
          </button>
        ) : (
          <button onClick={() => toPDF()}>
            <i className="fa-solid fa-download"></i>
            Download Report
          </button>
        )}
      </div>
      {reportGenerated && (
        <div ref={targetRef}>
          <ReportComponent />
        </div>
      )}
    </div>
  );
};

export default Reports;
