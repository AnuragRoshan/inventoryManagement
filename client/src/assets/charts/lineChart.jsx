import React, { useEffect, useState } from "react";
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
import axios from "axios";

Chartjs.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
);

const Charts = () => {
  const [populationData, setPopulationData] = useState([]);

  const convertToMillion = (data) => {
    return data.map((entry) => {
      return {
        Year: entry.Year,
        Population: entry.Population / 1000000,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        setPopulationData(convertToMillion(response.data.data));
        console.log("Population data:", response.data.data);
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: populationData.map((entry) => entry.Year).reverse(),
    datasets: [
      {
        label: "Data over three month",
        data: populationData.map((entry) => entry.Population).reverse(),
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
            return `Population: ${context.parsed.y.toFixed(2)} million`;
          },
        },
      },
    },
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
      {/* <div className="chart-head">US Population Data Over the years</div> */}
      <div className="chart-main">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Charts;
