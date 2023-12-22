import styles from "./BNP.module.css";
import { useEffect, useState } from "react";
import LineChart from "../LineChart";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import MenuSelector from "../MenuSelector";

const year = new Date().getFullYear();
const timeArray = [...new Array(49)].map((el, i) => 1980 + i);

function BNP() {
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(year);
  console.log(timeArray);

  useEffect(function () {
    async function fetchBNP() {
      setError(false);
      setIsLoading(true);
      try {
        const countryRaw = await fetch(
          "https://corsproxy.io/?https://www.imf.org/external/datamapper/api/v1/countries",
          { mode: "cors", type: "GET" }
        );

        const countryDataRaw = await fetch(
          "https://corsproxy.io/?https://www.imf.org/external/datamapper/api/v1/NGDP_RPCH",
          { mode: "cors", type: "GET" }
        );

        if (!countryRaw.ok || !countryDataRaw.ok)
          throw new Error("Failed to fetch data ");
        const jsonCountries = await countryRaw.json();
        const jsonCountryData = await countryDataRaw.json();
        setCountries(jsonCountries);
        setCountryData(jsonCountryData);
        console.log(jsonCountries, jsonCountryData);
      } catch (er) {
        setError(er);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBNP();
  }, []);

  const selectorChoice = countryData.values.NGDP_RPCH
    ? Object.keys(countryData.values.NGDP_RPCH).reduce((acc, el) => {
        return [
          ...acc,
          [
            el,
            countries.countries[`${String(el).toUpperCase()}`]
              ? countries.countries[`${String(el).toUpperCase()}`]["label"]
              : "",
          ],
        ];
      }, [])
    : [];
  const values = countryData.values ? countryData.values.NGDP_RPCH : [];
  console.log(countryData);
  console.log(selectorChoice);

  const chartDataArray = selected.map((element, i) => {
    const [name] = selectorChoice.filter((el) => el[0] === element);
    console.log(Object(countryData.values.NGDP_RPCH[element]));
    const mapped = timeArray.map(
      (el) => Object(countryData.values.NGDP_RPCH[element])[el]
    );
    console.log(mapped);

    return {
      label: [`${name[1] || name[0]}`],
      data: mapped,
      backgroundColor: `hsl(${i * 27}, 100%, 50%)`,
      borderColor: `hsl(${i * 27}, 100%, 50%)`,
      borderWidth: 1.5,
      fill: false,
    };
  });
  console.log(chartDataArray);
  console.log(selected);
  return (
    <>
      <div className={styles.bnpContainer}>
        <h2>BNP-utvikling, ulike land</h2>
        <div className={styles.elementContainer}>
          {error && <ErrorMessage error={error} />}
          {isLoading && <Loading />}
          {countryData.values && countries.countries && (
            <div className={styles.selectorContainer}>
              <MenuSelector
                array={selectorChoice}
                selected={selected}
                setSelected={setSelected}
                placeholder={"Velg land (du kan velge flere)"}
              />
            </div>
          )}
          {selected.length > 0 && (
            <div className={styles.chart}>
              <LineChart
                time={timeArray}
                datasets={chartDataArray}
                unit="%"
                heigth="60vh"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BNP;

// const chartInput = [
//     {
//       label: [`${el.label}`],
//       data: Object.values(countryData.values.NGDP_RPCH[el]),
//       backgroundColor: `hsl(${i * 9}, 100%, 50%)`,
//       borderColor: `hsl(${i * 9}, 100%, 50%)`,
//       borderWidth: 1.5,
//       fill: false,
//     },
//   ];
//      return (
//        <div className={styles.chart} key={i}>
//          <LineChart
//            time={timeArray}
//            datasets={chartInput}
//            unit="Kr"
//            heigth="30vh"
//          />
//        </div>
//      );
//    })}
