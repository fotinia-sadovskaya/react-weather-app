// src/Weather.js
import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ loaded: false });
  const [city, setCity] = useState(props.defaultCity);
  const [unit, setUnit] = useState("celsius");

  function handleResponse(response) {
    setWeatherData({
      loaded: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
      feel: response.data.main.feels_like || null,
      country: response.data.sys.country,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "583543d42b8605a7c28a20d072be705c";
    const units = "metric";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(handleResponse).catch((error) => {
      console.error("Weather API error:", error);
    });
  }

  // function showLocation(position) {
  //   const currentLatitude = position.coords.latitude;
  //   const currentLongitude = position.coords.longitude;
  //   const apiKey = "583543d42b8605a7c28a20d072be705c";
  //   const units = "metric";
  //   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=${units}`;
  //   axios.get(apiUrl).then(handleResponse).catch((error) => {
  //     console.error("Location API error:", error);
  //   });
  // }

  if (weatherData.loaded) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-9 mb-3">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus
                onChange={handleCityChange}
              />
            </div>
            <div className="col-sm-3 mb-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-info w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} unit={unit} setUnit={setUnit} />
        <hr />
        <WeatherForecast
          coordinates={weatherData.coordinates}
          unit={unit}
          setUnit={setUnit}
        />
      </div>
    );
  } else {
    search();
    return <div className="loading-screen">Loading...</div>;
  }
}