import { useEffect, useState } from "react";
import styles from "./HentVaeret.module.css";
import ChartConstructor from "./ChartConstructor";
import WeatherNow from "./WeatherNow";
import Loading from "./Loading";

const heading = "Været time for time";
const unit = "°C";
const label = "Temperatur";
const current = new Date().getHours();
const backgroundColor1 = ["rgba(1,1,1,0.3)"];
const backgroundColor2 = ["rgba(24,200,130,0.3)"];
const backgroundColor3 = ["rgba(160,26,170,0.3)"];
const backgroundColor4 = ["rgba(250,200,30,0.3)"];

function HentVaeret({ lat, lng }) {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(current);
  const time =
    weather?.hourly?.time
      ?.map((el) => {
        const time = new Date(el);
        const hour = String(time.getHours()).padStart(2, 0);
        //const dateString = `${String(time.getDate()).padStart(2, 0)}-${String(
        //   time.getMonth() + 1
        //  ).padStart(2, 0)}-${String(time.getFullYear())}, `;
        return `${hour}:00`;
      })
      .slice(0 + current, 96 + current) || [];

  const temp =
    weather?.hourly?.temperature_2m
      ?.map((el) => el)
      .slice(0 + current, 96 + current) || [];

  const appTemp =
    weather?.hourly?.apparent_temperature
      ?.map((el) => el)
      .slice(0 + current, 96 + current) || [];

  const precipitation =
    weather?.hourly?.precipitation
      ?.map((el) => el)
      .slice(0 + current, 96 + current) || [];
  const soilTemp =
    weather?.hourly?.soil_temperature_0cm
      ?.map((el) => el)
      .slice(0 + current, 96 + current) || [];

  console.log(precipitation);

  useEffect(function () {
    async function getWeather() {
      setIsLoading(true);
      try {
        const data = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}1&current=temperature_2m,apparent_temperature,is_day,weather_code,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,apparent_temperature,precipitation,soil_temperature_0cm&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=auto&wind_speed_unit=kn`
        );
        const dataJSON = await data.json();
        setWeather(dataJSON);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    getWeather();
  }, []);

  const chartInput = [
    {
      label: "Temperatur",
      data: temp.map((val) => val),
      backgroundColor: backgroundColor4,
      borderColor: "white",
      borderWidth: 1.5,
      clip: "5",
      fill: "start",
    },
    {
      label: "Temperatur føles som",
      data: appTemp.map((val) => val),
      backgroundColor: backgroundColor2,
      borderColor: "white",
      borderWidth: 1.5,
      fill: "start",
      yAxisID: "y",
    },
    {
      label: "Bakketemperatur",
      data: soilTemp.map((val) => val),
      backgroundColor: backgroundColor3,
      borderColor: "white",
      borderWidth: 1.5,
      fill: "start",
    },
    {
      label: "Nedbør",
      type: "bar",
      data: precipitation.map((val) => val),
      backgroundColor: backgroundColor1,
      borderColor: "white",
      borderWidth: 1.5,
      fill: "start",
      yAxisID: "y1",
    },
  ];

  return (
    <section className={styles.sectionContainer}>
      <div>
        {isLoading && <Loading />}
        {error && <Error error={error} />}
        {!isLoading && !error && weather.current && (
          <>
            <WeatherNow weather={weather} />

            <ChartConstructor
              time={time}
              label={label}
              heading={heading}
              unit={unit}
              datasets={chartInput}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default HentVaeret;
