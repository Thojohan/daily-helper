import { useEffect, useState } from "react";
import styles from "./HentVaeret.module.css";
import LineChart from "../LineChart";
import WeatherNow from "./WeatherNow";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const unit = "°C";
const label = "Temperatur";
const time = new Date();
const current = time.getHours();
const hoursLeftOfDay = current === 0 ? 0 : 24 - current;
const backgroundColor1 = ["rgba(1,1,1,0.3)"];
const backgroundColor2 = ["rgba(24,200,130,0.3)"];
const backgroundColor3 = ["rgba(160,26,170,0.3)"];
const backgroundColor4 = ["rgba(250,200,30,0.3)"];

function HentVaeret({ lat, lng, location }) {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(current);
  const heading = `Været for ${location}`;
  console.log(weather);
  const time =
    weather?.hourly?.time
      ?.map((el) => {
        const time = new Date(el);
        const hour = String(time.getHours()).padStart(2, 0);
        return `${hour}:00`;
      })
      .slice(0 + current, 120 + current) || [];

  const timeISO =
    weather?.hourly?.time?.map((el) => el).slice(0 + current, 120 + current) ||
    [];

  const temp = weather?.hourly?.temperature_2m?.map((el) => el) || [];

  const appTemp = weather?.hourly?.apparent_temperature?.map((el) => el) || [];

  const precipitation = weather?.hourly?.precipitation?.map((el) => el) || [];

  const soilTemp = weather?.hourly?.soil_temperature_0cm?.map((el) => el) || [];

  const cloudCover = weather?.hourly?.cloud_cover?.map((el) => el) || [];

  const isDay = weather?.hourly?.is_day?.map((el) => el) || [];

  const weatherCode = weather?.hourly?.weather_code?.map((el) => el) || [];
  console.log(weather);

  const windSpeed = weather?.hourly?.wind_speed_10m?.map((el) => el) || [];
  console.log(weather);

  const windDirection =
    weather?.hourly?.wind_direction_10m?.map((el) => el) || [];
  console.log(weather);

  const forecastHours = [
    6 + hoursLeftOfDay,
    14 + hoursLeftOfDay,
    20 + hoursLeftOfDay,
    30 + hoursLeftOfDay,
    38 + hoursLeftOfDay,
    44 + hoursLeftOfDay,
    54 + hoursLeftOfDay,
    62 + hoursLeftOfDay,
    68 + hoursLeftOfDay,
    78 + hoursLeftOfDay,
    86 + hoursLeftOfDay,
    92 + hoursLeftOfDay,
    102 + hoursLeftOfDay,
    110 + hoursLeftOfDay,
    116 + hoursLeftOfDay,
  ];

  console.log(forecastHours);

  const forecastStringData = timeISO
    .reduce((acc, el, i) => {
      return [
        ...acc,
        {
          time: el,
          wind_direction_10m: windDirection[i],
          wind_speed_10m: windSpeed[i],
          weather_code: weatherCode[i],
          temperature_2m: temp[i],
          apparent_temperature: appTemp[i],
          precipitation: precipitation[i],
          is_day: isDay[i],
          cloud_cover: cloudCover[i],
        },
      ];
    }, [])
    .filter((_el, i) => forecastHours.some((el) => el === i));
  console.log(weather);
  console.log(forecastStringData);

  useEffect(function () {
    async function getWeather() {
      setIsLoading(true);
      try {
        const data = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}1&current=temperature_2m,apparent_temperature,is_day,weather_code,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,apparent_temperature,precipitation,cloud_cover,soil_temperature_0cm,weather_code,is_day,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=auto&wind_speed_unit=kn`
        );
        const dataJSON = await data.json();
        if (!data.ok) throw new Error("Kunne ikke hente været");
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
      data: temp.map((val) => val).slice(0 + current, 120 + current),
      backgroundColor: backgroundColor4,
      borderColor: "white",
      borderWidth: 1.5,
      clip: "5",
      fill: "start",
    },
    {
      label: "Temperatur føles som",
      data: appTemp.map((val) => val).slice(0 + current, 120 + current),
      backgroundColor: backgroundColor2,
      borderColor: "white",
      borderWidth: 1.5,
      fill: "start",
      yAxisID: "y",
    },
    {
      label: "Bakketemperatur",
      data: soilTemp.map((val) => val).slice(0 + current, 120 + current),
      backgroundColor: backgroundColor3,
      borderColor: "white",
      borderWidth: 1.5,
      fill: "start",
    },
    {
      label: "Nedbør",
      type: "bar",
      data: precipitation.map((val) => val).slice(0 + current, 120 + current),
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
        {error && <ErrorMessage error={error} />}
        {!isLoading && !error && weather.current && (
          <div className={styles.weatherWrapper}>
            <WeatherNow weather={weather.current} />

            <LineChart
              time={time}
              label={label}
              heading={heading}
              unit={unit}
              datasets={chartInput}
            />

            <div>
              {" "}
              {forecastStringData.map((el, i) => (
                <WeatherNow key={i} weather={el} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default HentVaeret;
