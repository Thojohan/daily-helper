import styles from "./Valuta.module.css";
import { useEffect, useState } from "react";
import LineChart from "../LineChart";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

function Valuta({ newTime, oldTime }) {
  const [valutaKurs, setValutaKurs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(function () {
    async function fetchValuta() {
      setError(false);
      setIsLoading(true);
      try {
        const data = await fetch(
          `https://data.norges-bank.no/api/data/EXR/M..NOK.SP?startPeriod=${oldTime}&endPeriod=${newTime}&format=sdmx-json&locale=no`
        );

        if (!data.ok) throw new Error("Failed to fetch data ");
        const jsonData = await data.json();
        setValutaKurs(jsonData);
      } catch (er) {
        setError(er);
      } finally {
        setIsLoading(false);
      }
    }
    fetchValuta();
  }, []);

  const valutaer = valutaKurs.data
    ? valutaKurs.data.structure.dimensions.series.at(1).values
    : [];

  const verdier = valutaKurs.data
    ? Object.values(valutaKurs.data?.dataSets.at(0).series).reduce(
        (acc, el) => {
          const arr = Object.values(el.observations).map(([el]) => el);
          return [...acc, arr];
        },
        []
      )
    : [];

  const tid = valutaKurs.data
    ? valutaKurs.data.structure.dimensions.observation
        .at(0)
        .values.map((el) => el.name)
        .sort((a, b) => new Date(a) - new Date(b))
    : [];

  return (
    <>
      <div className={styles.contentContainer}>
        <h2>Vekslingskurser til NOK, siste 5 år</h2>

        {error && <ErrorMessage error={error} />}
        <div className={styles.valutaContainer}>
          {isLoading && <Loading />}
          {valutaKurs.data &&
            valutaer.map((el, i) => {
              const chartInput = [
                {
                  label: [`${el.name}, ${el.id}`],
                  data: verdier.at(`${i}`).map((val) => val),
                  backgroundColor: `hsl(${i * 9}, 100%, 50%)`,
                  borderColor: `hsl(${i * 9}, 100%, 50%)`,
                  borderWidth: 2,
                  fill: false,
                },
              ];
              return (
                <div className={styles.chart} key={i}>
                  <LineChart
                    time={tid}
                    datasets={chartInput}
                    unit="kr"
                    heigth="30vh"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Valuta;
