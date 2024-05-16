import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const EmployeeBarChart = () => {
  // Custom data arrays for departments and employee counts
  const customDepartments = [
    "HR",
    "Finance",
    "Engineering",
    "Marketing",
    "Sales",
  ];
  const customEmployeeCounts = [80, 73, 94, 85, 128];

  return (
    <div className="chart-top">
      <div style={{ width: "100%" }}>
        <Bar
          data={{
            // Custom x-axis labels for each department
            labels: customDepartments,
            datasets: [
              {
                // Label for bars
                label: "Number of Employees",
                // Data or value for each department
                data: customEmployeeCounts,
                // Color of each bar
                backgroundColor: "#3811a330",
                // Border color of each bar
                borderColor: "#3811a3",
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of the graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Departments",
                  font: {
                    size: 16,
                    family: "Montserrat",
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Employees",
                  font: {
                    size: 16,
                    family: "Montserrat",
                  },
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 15,
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeBarChart;
