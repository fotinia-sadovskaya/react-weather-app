import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (props.coordinates) {
      setLoaded(false);
      load();
    }
  }, [props.coordinates, props.unit]);

  function handleResponse(response) {
    console.log(response.data);
    setForecast(response.data.daily);
    setLoaded(true);
  }

  function load() {
    const longitude = props.coordinates.lon;
    const latitude = props.coordinates.lat;
    const apiKey = "583543d42b8605a7c28a20d072be705c";
    const units = "metric";
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((error) => {
        console.error("Forecast API error:", error);
        setLoaded(false);
      });
  }

  if (loaded && forecast) {
    console.log(forecast);
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index > 0 && index < 5) {
              return (
                <div className="col-sm mt-2 mb-4" key={index}>
                  <WeatherForecastDay data={dailyForecast} unit={props.unit} setUnit={props.setUnit} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {

    return "loading...";
  }
}
