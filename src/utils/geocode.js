const axios = require("axios");

const geocode = async (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibW91dTdhbWVkIiwiYSI6ImNsN3g4a3JxZzA2bTQzb3BydDVheTV1YXgifQ.hCo2ApMI2vJLwGcaPOcPXg`;

  const response = await axios.get(url);
  const { data } = await response;

  const info = {
    location: data.features[0]?.place_name,
    latitude: data.features[0]?.center[1],
    longitude: data.features[0]?.center[0],
  };

  const { location, latitude, longitude } = info;

  !!response.data.features.length > 0
    ? callback(undefined, {
        location,
        latitude,
        longitude,
      })
    : callback("Unable to find location. try another search.", undefined);
};

module.exports = geocode;
