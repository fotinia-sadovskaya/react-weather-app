// src/WeatherForecast.js
import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (props.coordinates && props.coordinates.lat && props.coordinates.lon) {
      setLoaded(false);

      const { lon, lat } = props.coordinates;
      const apiKey = "583543d42b8605a7c28a20d072be705c";
      const units = "metric";
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

      axios
        .get(apiUrl)
        .then((response) => {
          console.log("Forecast array:", response.data.daily);
          setForecast(response.data.daily);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Forecast API error:", error);
          setLoaded(false);
        });
    }
  }, [props.coordinates]);

  if (loaded && forecast) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map((dailyForecast, index) => {
            if (index < 5) {
              return (
                <div className="col-sm mt-2 mb-4" key={index}>
                  <WeatherForecastDay
                    data={dailyForecast}
                    unit={props.unit}
                    setUnit={props.setUnit}
                  />
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
    return <div className="loading-forecast">Loading forecast...</div>;
  }
}
