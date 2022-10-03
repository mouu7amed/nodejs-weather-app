const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirPath));

app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/forecast", (req, res) => {
  const address = req.query.address;

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
});

app.get("/forecast/*", (req, res) => {
  res.render("404", {
    message: "City Not Found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page Not Found!",
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
