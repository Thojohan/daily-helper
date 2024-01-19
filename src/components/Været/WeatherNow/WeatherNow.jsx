import styles from "./WeatherNow.module.css";
import { findBeaufort } from "../../../utility/findBeufort";
import { findWindDirection } from "../../../utility/findWindDirection";
import { findWeatherCode } from "../../../utility/findWeatherCode";

function WeatherNow({ weather }) {
  const time = new Date(weather.time);
  const timeString = time.toLocaleDateString();
  const current = `${String(time.getHours()).padStart(2, "0")}:${String(
    time.getMinutes()
  ).padStart(2, "0")}`;

  return (
    <p className={styles.tempStatus}>
      <span>
        {timeString}
        <br></br> Kl {current}
      </span>
      <span>Temperatur {weather.temperature_2m}℃</span>
      <span>Føles som {weather.apparent_temperature}℃</span>
      <span>Skydekke {weather.cloud_cover}%</span>
      <span>
        {`${findWindDirection(
          weather.wind_direction_10m,
          weather.wind_speed_10m
        )} ${findBeaufort(weather.wind_speed_10m)}`}
      </span>
      <span>{weather.precipitation}mm nedbør denne timen</span>
      <img
        className={styles.icon}
        src={findWeatherCode(weather.weather_code, weather.is_day)}
      />
    </p>
  );
}

export default WeatherNow;
