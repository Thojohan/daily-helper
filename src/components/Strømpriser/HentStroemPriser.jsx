import { useEffect, useState } from "react";
import Selector from "../Selector.jsx";
import styles from "./HentStroemPriser.module.css";
import LineChart from "../LineChart.jsx";
import Loading from "../Loading.jsx";
import ErrorMessage from "../ErrorMessage.jsx";

const timeNow = new Date();
const year = timeNow.getFullYear();
const month = String(timeNow.getMonth() + 1).padStart(2, 0);
const date = String(timeNow.getDate()).padStart(2, 0);
const heading = "Dagens strømpriser";
const unit = "kr";
const backgroundColor = ["rgba(75,192,192,0.3)"];
const geoAreas = [
  ["Oslo / Øst-Norge", "NO1"],
  ["Kristiansand / Sør-Norge", "NO2"],
  ["Trondheim / Midt-Norge", "NO3"],
  ["Tromsø / Nord-Norge", "NO4"],
  ["Bergen / Vest-Norge", "NO5"],
];

function HentStroemPriser() {
  const [area, setArea] = useState(geoAreas.at(1));
  const [priser, setPriser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(priser);

  const time = priser.map((pris) => {
    const time = new Date(pris.time_start);
    return `${String(time.getHours()).padStart(2, 0)}:00`;
  });
  const pris = priser.map((pris) =>
    area.at(1) === "NO4" ? pris.NOK_per_kWh : pris.NOK_per_kWh * 1.25
  );

  useEffect(
    function () {
      setIsLoading(true);
      async function finnStroem() {
        try {
          console.log(area.at(0), year, month, date);
          const data = await fetch(
            `https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${date}_${area.at(
              1
            )}.json`
          );
          const dataJSON = await data.json();
          setPriser(dataJSON);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }
      finnStroem();
    },
    [setPriser, setError, area]
  );

  const chartInput = [
    {
      label: ["Pris inkludert mva, uten strømstøtte"],
      data: pris.map((val) => val),
      backgroundColor: backgroundColor,
      borderColor: "white",
      borderWidth: 1.5,
      fill: true,
    },
  ];

  return (
    <section className={styles.sectionContainer}>
      <Selector updateSelection={setArea} options={geoAreas} />

      {isLoading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {!isLoading && !error && priser.length > 0 && (
        <LineChart
          time={time}
          unit={unit}
          heading={heading}
          datasets={chartInput}
        />
      )}
    </section>
  );
}

export default HentStroemPriser;
