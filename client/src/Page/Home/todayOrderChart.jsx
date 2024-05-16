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

const TodayOrderChart = () => {
  // Custom data arrays for days of the week and order values
  const customDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const customOrders = [34, 45, 46, 40, 60, 30, 50];

  const data = {
    labels: customDays, // Custom x-axis array
    datasets: [
      {
        label: "Orders Over the Week",
        data: customOrders, // Custom y-axis array
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
            return `Orders: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days of the Week",
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

export default TodayOrderChart;
