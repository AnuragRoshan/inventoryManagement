import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const barChart = () => {
  // Custom data arrays for months and order values
  const customMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const customOrders = [
    1235, 1552, 1319, 613, 1400, 1000, 800, 950, 1200, 1400, 1600, 1700,
  ];

  return (
    <div className="chart-top">
      <div style={{ width: "100%" }}>
        <Bar
          data={{
            // Custom x-axis labels for each month
            labels: customMonths,
            datasets: [
              {
                // Label for bars
                label: "Total Orders",
                // Data or value for each month
                data: customOrders,
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
                  text: "Months",
                  font: {
                    size: 16,
                    family: "Montserrat",
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Orders",
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

export default barChart;
