import styles from "./ChartConstructor.module.css";
import Chart from "chart.js/auto";
import { CategoryScale, Filler } from "chart.js";
import LineChart from "./LineChart";

Chart.register(CategoryScale);
Chart.register(Filler);

function ChartConstructor({
  time,
  data,
  label,
  heading,
  unit,
  backgroundColor,
}) {
  console.log(time, data, label, heading, unit);
  const chartData = {
    labels: time,
    datasets: [
      {
        label: label,
        data: data.map((val) => val),
        backgroundColor: backgroundColor,
        borderColor: "white",
        borderWidth: 1.5,
        fill: true,
      },
    ],
  };
  return (
    <div>
      <LineChart chartData={chartData} heading={heading} unit={unit} />
    </div>
  );
}

export default ChartConstructor;
