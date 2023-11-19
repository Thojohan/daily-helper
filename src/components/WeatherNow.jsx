import styles from "./WeatherNow.module.css";
import { findBeaufort } from "../utility/findBeufort";
import { findWindDirection } from "../utility/findWindDirection";

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
  },
  {
    weatherCode: [45, 48],
    picture: "fog.svg",
  },
  {
    weatherCode: [51, 53, 55, 56],
    picture: "drizzle.svg",
  },
  {
    weatherCode: [56, 57],
    picture: "freezing-drizzle.svg",
  },

  { weatherCode: [57, 66, 67], picture: "freezing-rain.svg" },
  {
    weatherCode: [61, 80],
    picture: "light-rain.svg",
  },
  {
    weatherCode: [63, 81],
    picture: "medium-rain.svg",
  },
  {
    weatherCode: [65, 82],
    picture: "heavy-rain.svg",
  },
  {
    weatherCode: [71, 85],
    picture: "light-snow.svg",
  },
  {
    weatherCode: [73],
    picture: "medium-snow.svg",
  },
  {
    weatherCode: [75, 86],
    picture: "heavy-snow.svg",
  },
  {
    weatherCode: [77],
    picture: "grain.svg",
  },
  {
    weatherCode: [95],
    picture: "thunderstorm.svg",
  },
  { weatherCode: [96, 99], picture: "snow-storm.svg" },
];

function findCode(code, isDay) {
  const [picName] = weatherCodes.filter(
    (el) => el.weatherCode.filter((el) => el === +code) && el
  );

  return `./src/assets/weather/${
    !isDay && picName.pictureNight ? picName.pictureNight : picName.picture
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
  console.log(weather);
  return (
    <p className={styles.tempStatus}>
      <span>Temperatur {weather.current.temperature_2m}℃</span>
      <span>Føles som {weather.current.apparent_temperature}℃</span>
      <span>Skydekke {weather.current.cloud_cover}%</span>
      <span>
        {`${findWindDirection(
          weather.current.wind_direction_10m,
          weather.current.wind_speed_10m
        )} ${findBeaufort(weather.current.wind_speed_10m)}`}
      </span>
      <span>{weather.current.precipitation}mm nedbør denne timen</span>
      <img
        className={styles.icon}
        src={findCode(weather.current.weather_code, weather.current.is_day)}
      />
    </p>
  );
}

export default WeatherNow;
