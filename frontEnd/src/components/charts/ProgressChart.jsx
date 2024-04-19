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
        data: [completedPercentage, incompletePercentage],
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
    },
    layout: {
      padding: {
        top: 10,
        bottom: 250,
        left: 20,
        right: 20,
      },
    },
  };
  // Custom plugin to display the project completion percentage in the center
  const textCenter = {
    id: "textCenter",
    beforeDraw(chart, args, pluginOptions) {
      const { ctx, chartArea } = chart;
      ctx.save();
      ctx.font = "bolder 30px sans-serif";
      ctx.fillStyle = "#d9534f";
      const text = `${Math.floor(chart.data.datasets[0].data[0])}%`;
      const textWidth = ctx.measureText(text).width;
      const textX = (chartArea.left + chartArea.right - textWidth) / 2;
      const textY = (chartArea.top + chartArea.bottom) / 2;
      ctx.fillText(text, textX, textY);
      ctx.restore();
    },
  };
  return (
    <>
      <Doughnut data={data} options={options} plugins={[textCenter]} />
    </>
  );
};

export default ProgressChart;
