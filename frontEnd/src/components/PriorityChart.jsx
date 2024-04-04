import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// REGISTER CHART
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PriorityChart = ({ chartData }) => {
  const data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: ["Task priority"],
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options}></Bar>
    </>
  );
};

export default PriorityChart;
