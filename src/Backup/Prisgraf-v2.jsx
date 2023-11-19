import styles from "./Prisgraf.module.css";
import Chart from "chart.js/auto";
import { CategoryScale, Filler } from "chart.js";
import LineChart from "./LineChart";

Chart.register(CategoryScale);
Chart.register(Filler);

const heading = "Dagens strømpriser, time for time";
const unit = "kr";

function Prisgraf({ priser }) {
  const chartData = {
    labels: priser.map((pris) => {
      const time = new Date(pris.time_start);
      return `${String(time.getHours()).padStart(2, 0)}:00`;
    }),
    datasets: [
      {
        label: "Dagens strømpriser",
        data: priser.map((pris) => pris.NOK_per_kWh),
        backgroundColor: ["rgba(75,192,192,0.3)"],
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

export default Prisgraf;
