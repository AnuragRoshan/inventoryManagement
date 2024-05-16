import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

Chartjs.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
);

const SalarySpendChart = () => {
  // Custom data arrays for months and salary spend values
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
  const customSalarySpend = [
    50000, 52000, 55000, 53000, 56000, 58000, 60000, 62000, 61000, 63000, 65000,
    67000,
  ];

  const data = {
    labels: customMonths, // Custom x-axis array
    datasets: [
      {
        label: "Salary Spend Over the Year",
        data: customSalarySpend, // Custom y-axis array
        fill: true,
        backgroundColor: "#3811a330",
        borderColor: "#3811a3",
        borderWidth: 1,
        pointBackgroundColor: "#3811a3",
        pointBorderColor: "#3811a3",
        pointHoverBackgroundColor: "#3811a3",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
        lineTension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Salary Spend: $${context.parsed.y}`;
          },
        },
      },
    },
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
          text: "Salary Spend (in $)",
          font: {
            size: 16,
            family: "Montserrat",
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <div className="chart-top">
      <div className="chart-main">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalarySpendChart;
