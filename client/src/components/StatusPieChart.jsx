import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusPieChart = ({ invoices }) => {
  const statusCount = {
    Paid: 0,
    Unpaid: 0,
    Overdue: 0,
    Draft: 0,
  };

  invoices.forEach((i) => {
    if (statusCount[i.status] !== undefined) {
      statusCount[i.status]++;
    }
  });

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#3b82f6",
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default StatusPieChart;
