import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const ChartOne = ({ cases }) => {
  const reasonCount = {};

  cases.forEach(c => {
    reasonCount[c.reason] = (reasonCount[c.reason] || 0) + 1;
  });

  const data = {
    labels: Object.keys(reasonCount),
    datasets: [
      {
        label: "# of Cases",
        data: Object.values(reasonCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#E91E63"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h5 className="mb-3">Case Reason Distribution</h5>
      <Pie data={data} />
    </>
  );
};

export default ChartOne;