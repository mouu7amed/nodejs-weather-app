const searchForm = document.querySelector(".search-form");
const searchField = document.querySelector("#search-field");
const cityEl = document.querySelector(".city");
const loadingSpinner = document.querySelector(".loading");

const fetchData = async (address) => {
  loadingSpinner.classList.toggle("loading-show");

  await fetch(`/forecast?address=${address}`)
    .then((response) => {
      response.json().then((data) => {
        loadingSpinner.classList.toggle("loading-show");
        if (data.error) {
          return console.log(data.error);
        }

        document.querySelector(".forecast").style.backgroundColor = "#fff";
        document.querySelector(".forecast").style.boxShadow =
          "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px";

        const forecast = {
          cityName: data.location.split(","),
          location: data.location,
          temperature: data.forecast.temperature,
          icon: data.forecast.weather_icons[0],
          humidity: data.forecast.humidity,
          description: data.forecast.weather_descriptions[0],
          windSpeed: data.forecast.wind_speed,
          windDirection: data.forecast.wind_dir,
          visibility: data.forecast.visibility,
        };

        if (forecast.cityName.length > 0) {
          cityEl.innerHTML = forecast.cityName[0];
        }
        document.querySelector(".description").innerHTML = forecast.description;
        document.querySelector(".location").innerHTML = forecast.location;
        document.querySelector(
          ".temp"
        ).innerHTML = ` ${forecast.temperature}°C`;
        document.querySelector(".weather-icon").src = forecast.icon;
        document.querySelector(
          ".hum"
        ).innerHTML = `Humidity: ${forecast.humidity}%`;
        document.querySelector(
          ".wind"
        ).innerHTML = `Wind: ${forecast.windSpeed} ${forecast.windDirection}`;
        document.querySelector(
          ".vis"
        ).innerHTML = `Visibility: ${forecast.visibility}%`;
      });
    })
    .catch((error) => console.log(error.message));
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchField.value;
  if (!location) return;
  fetchData(location);
});
