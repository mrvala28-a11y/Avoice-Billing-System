import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const RevenueBarChart = ({ invoices }) => {
  const totals = {
    Paid: 0,
    Unpaid: 0,
    Overdue: 0,
    Draft: 0,
  };

  invoices.forEach((i) => {
    if (totals[i.status] !== undefined) {
      totals[i.status] += i.amount || 0;
    }
  });

  const data = {
    labels: Object.keys(totals),
    datasets: [
      {
        label: "Revenue ₹",
        data: Object.values(totals),
        backgroundColor: "#6366f1",
      },
    ],
  };

  return <Bar data={data} />;
};

export default RevenueBarChart;
