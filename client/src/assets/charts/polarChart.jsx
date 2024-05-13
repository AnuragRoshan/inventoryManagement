import React from "react";
import { MDBContainer } from "mdbreact";
import { Polar } from "react-chartjs-2";

const polarChart = () => {
  // Sample data
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Hours Studied in Geeksforgeeks",
        data: [2, 5, 6, 7, 3],
        backgroundColor: ["blue", "green", "yellow", "pink", "orange"],
      },
    ],
  };

  return (
    <MDBContainer>
      <Polar data={data} />
    </MDBContainer>
  );
};

export default polarChart;
