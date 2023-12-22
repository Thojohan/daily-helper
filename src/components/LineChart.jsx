import styles from "./LineChart.module.css";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { CategoryScale, Filler } from "chart.js";

Chart.register(CategoryScale);
Chart.register(Filler);

function LineChart({
  time,
  heading = false,
  unit,
  datasets,
  heigth = "65vh",
  label = true,
}) {
  const chartData = {
    labels: time,
    datasets: datasets,
  };
  return (
    <div className={styles.wrapper} style={{ height: `${heigth}` }}>
      <div className={styles.chartContainer}>
        {heading ? <h2 style={{ textAlign: "center" }}>{heading}</h2> : ""}
        <Line
          className={styles.graph}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 0,
              },
            },

            plugins: {
              legend: {
                display: label,

                labels: {
                  color: "white",
                },
              },
              title: {
                display: false,
              },
            },
            scales: {
              y: {
                id: "y",
                ticks: {
                  color: "white",
                  font: {
                    size: 14,
                    weight: 400,
                  },
                  callback: function (value, index, ticks) {
                    return value.toFixed(`${unit === "kr" ? 2 : 1}`) + unit;
                  },
                },
                grid: {
                  color: "white",
                  lineWidth: 0.3,
                },
              },
              y1: {
                id: "y1",
                position: "right",
                beginAtZero: true,
                display: "auto",
                min: 0,
                suggestedMax: 3,
                ticks: {
                  color: "white",
                  font: {
                    size: 14,
                    weight: 400,
                  },
                  callback: function (value, index, ticks) {
                    return value.toFixed(`${unit === "kr" ? 2 : 1}`) + "mm";
                  },
                },
              },
              x: {
                offset: false,
                ticks: {
                  color: "white",
                  font: {
                    size: 13,
                    weight: 400,
                  },
                },
                grid: {
                  color: "white",
                  lineWidth: 0.3,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default LineChart;
