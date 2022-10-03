const forecast = require("./forecast");
const geocode = require("./geocode");

const getWeather = (address, res) => {
  if (!address) {
    return res.send({
      error: "please provide an address in the url!",
    });
  }

  geocode(address, (error, { location, latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      res.send({
        search: address,
        location,
        forecast: data.current,
      });
    });
  });
};

module.exports = getWeather;
