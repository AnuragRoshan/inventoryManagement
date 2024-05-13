import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const barChart = () => {
  return (
    <div className="chart-top">
      <div style={{ width: "100%" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: [
              "1st bar",
              "2nd bar",
              "3rd bar",
              "4th bar",
              "5th bar",
              "6th bar",
            ],
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: [1235, 1552, 1319, 613, 1400, 1000],
                // Color of each bar
                backgroundColor: [
                  "#3811a330",
                  "#3811a330",
                  "#3811a330",
                  "#3811a330",
                ],
                // Border color of each bar
                borderColor: [
                  "#3811a330",
                  "#3811a330",
                  "#3811a330",
                  "#3811a330",
                ],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "y-axis",
                  font: {
                    size: 16,
                    family: "Montserrat",
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: "x-axis",
                  font: {
                    size: 16,
                    family: "Montserrat",
                  },
                },
              },
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default barChart;
