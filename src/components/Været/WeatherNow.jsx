import styles from "./WeatherNow.module.css";
import { findBeaufort } from "../../utility/findBeufort";
import { findWindDirection } from "../../utility/findWindDirection";

const weatherCodes = [
  { weatherCode: [0], picture: "sun.svg", pictureNight: "moon.svg" },
  {
    weatherCode: [1, 2],
    picture: "cloud-sun.svg",
    pictureNight: "cloud-moon.svg",
  },
  {
    weatherCode: [3],
    picture: "cloud.svg",
    pictureNight: null,
  },
  {
    weatherCode: [45, 48],
    picture: "fog.svg",
    pictureNight: null,
  },
  {
    weatherCode: [51, 53, 55, 56],
    picture: "drizzle.svg",
    pictureNight: null,
  },
  {
    weatherCode: [56, 57],
    picture: "freezing-drizzle.svg",
    pictureNight: null,
  },

  {
    weatherCode: [57, 66, 67],
    picture: "freezing-rain.svg",
    pictureNight: null,
  },
  {
    weatherCode: [61, 80],
    picture: "light-rain.svg",
    pictureNight: null,
  },
  {
    weatherCode: [63, 81],
    picture: "medium-rain.svg",
    pictureNight: null,
  },
  {
    weatherCode: [65, 82],
    picture: "heavy-rain.svg",
    pictureNight: null,
  },
  {
    weatherCode: [71, 85],
    picture: "light-snow.svg",
    pictureNight: null,
  },
  {
    weatherCode: [73],
    picture: "medium-snow.svg",
    pictureNight: null,
  },
  {
    weatherCode: [75, 86],
    picture: "heavy-snow.svg",
    pictureNight: null,
  },
  {
    weatherCode: [77],
    picture: "grain.svg",
    pictureNight: null,
  },
  {
    weatherCode: [95],
    picture: "thunderstorm.svg",
    pictureNight: null,
  },
  { weatherCode: [96, 99], picture: "snow-storm.svg", pictureNight: null },
];

function findCode(code, isDay) {
  const [weatherElement] = weatherCodes.filter((el) =>
    el.weatherCode.some((e) => e === code)
  );

  if (!weatherElement) return;

  return `./${
    isDay === 1 || !weatherElement?.pictureNight
      ? weatherElement.picture
      : weatherElement.pictureNight
  }`;
}

// function findWindDirection(degree, knots) {
//   if (knots === 0) return "";
//   if (degree > 337.5 || degree <= 22.5) return `Nordlig`;
//   if (degree > 22.5 || degree <= 67.5) return `Nordøstlig`;
//   if (degree > 67.5 || degree <= 112.5) return `Østlig`;
//   if (degree > 112.5 || degree <= 157.5) return `Sørøstlig`;
//   if (degree > 157.5 || degree <= 202.5) return `Sørlig`;
//   if (degree > 202.5 || degree <= 247.5) return `Sørvestlig`;
//   if (degree > 247.5 || degree <= 292.5) return `Vestlig`;
//   if (degree > 292.5 || degree <= 337.5) return `Nordvestlig`;
// }
//
// function findBeaufort(knots) {
//   if (knots < 1) return "Stille";
//   if (knots >= 1 && knots < 4) return "flau vind";
//   if (knots >= 4 && knots < 7) return "svak vind";
//   if (knots >= 7 && knots < 11) return "lett bris";
//   if (knots >= 11 && knots < 17) return "laber bris";
//   if (knots >= 17 && knots < 22) return "frisk bris";
//   if (knots >= 22 && knots < 28) return "liten kuling";
//   if (knots >= 22 && knots < 28) return "liten kuling";
//   if (knots >= 28 && knots < 34) return "stiv kuling";
//   if (knots >= 34 && knots < 41) return "sterk kuling";
//   if (knots >= 41 && knots < 48) return "liten storm";
//   if (knots >= 48 && knots < 56) return "full storm";
//   if (knots >= 56 && knots < 64) return "sterk storm";
//   if (knots >= 64) return "orkan";
// }

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
        src={findCode(weather.weather_code, weather.is_day)}
      />
    </p>
  );
}

export default WeatherNow;
