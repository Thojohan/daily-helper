import styles from "./ChartConstructor.module.css";
import Chart from "chart.js/auto";
import { CategoryScale, Filler } from "chart.js";
import LineChart from "./LineChart";

Chart.register(CategoryScale);
Chart.register(Filler);

function ChartConstructor({ time, heading, unit, datasets }) {
  const chartData = {
    labels: time,
    datasets: datasets,
  };
  return <LineChart chartData={chartData} heading={heading} unit={unit} />;
}

export default ChartConstructor;
