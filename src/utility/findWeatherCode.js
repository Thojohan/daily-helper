export function findWeatherCode(code, isDay) {
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
