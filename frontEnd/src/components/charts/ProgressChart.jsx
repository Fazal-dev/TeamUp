import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// REGISTER CHART
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ completedCount, incompleteCount }) => {
  const totalTasks = completedCount + incompleteCount;
  const completedPercentage = ((completedCount / totalTasks) * 100).toFixed(2);
  const incompletePercentage = ((incompleteCount / totalTasks) * 100).toFixed(
    2
  );

  const data = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        label: "Project Progress",
        data: [completedPercentage, incompletePercentage], // Representing completed and remaining percentage
        backgroundColor: ["#4CAF50", "#CCCCCC"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const labelIndex = context.dataIndex;
            const label = context.chart.data.labels[labelIndex];
            const value = context.formattedValue;
            return `${label}: ${value}%`;
          },
        },
      },
      legend: {
        display: false,
      },
      // Custom plugin to draw the completed percentage in the center
      beforeDraw: function (chart) {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;

        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = "middle";

        const text = `${completedPercentage}%`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  };
  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default ProgressChart;
