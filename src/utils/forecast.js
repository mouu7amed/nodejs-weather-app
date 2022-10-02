const axios = require("axios");

const forecast = async (latitude, longitude, callback) => {
  const response = await axios.get(
    `http://api.weatherstack.com/current?access_key=b03c597ded8c8a0a7424fdcbcf97bc16&query=${latitude},${longitude}`
  );

  const { data } = await response;

  !!data.current
    ? callback(undefined, data)
    : callback(`Error, ${data.error.info}`, undefined);
};

module.exports = forecast;
