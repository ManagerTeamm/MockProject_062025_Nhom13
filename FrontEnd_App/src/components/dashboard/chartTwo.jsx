import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartTwo = ({ cases }) => {
  const suspectCount = {};

  cases.forEach(c => {
    const name = c.suspect.fullName;
    suspectCount[name] = (suspectCount[name] || 0) + 1;
  });

  const data = {
    labels: Object.keys(suspectCount),
    datasets: [
      {
        label: "Cases per Suspect",
        data: Object.values(suspectCount),
        backgroundColor: "#42A5F5",
      },
    ],
  };

  return (
    <>
      <h5 className="mb-3">Cases by Suspect</h5>
      <Bar data={data} options={{ responsive: true }} />
    </>
  );
};

export default ChartTwo;
