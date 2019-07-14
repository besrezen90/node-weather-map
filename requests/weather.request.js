const rq = require("request-promise");

const WEATHER_API_KEY = "594d6f000270249696eb1b72b34ee69d";
const uri = "https://api.openweathermap.org/data/2.5/weather";

module.exports = async (city = "") => {
  if (!(city && city.length)) {
    throw new Error("Города не сущестует или введено неверное название");
  }

  const options = {
    uri,
    qs: {
      appid: WEATHER_API_KEY,
      q: city,
      units: "metric",
      json: true
    }
  };

  try {
    const data = JSON.parse(await rq(options));

    return {
      weather: {
        temp: data.main.temp.toFixed(0),
        name: city
      },
      error: null
    };
  } catch (error) {
    return {
      weather: null,
      error: error.error.message
    };
  }
};
