// src/WeatherForecast.js
import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState([]);

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
          const grouped = {};

          response.data.list.forEach((item) => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toDateString();

            if (!grouped[dayKey]) {
              grouped[dayKey] = {
                tempsMax: [],
                tempsMin: [],
                weatherIcons: [],
                dt: item.dt,
              };
            }

            grouped[dayKey].tempsMax.push(item.main.temp_max);
            grouped[dayKey].tempsMin.push(item.main.temp_min);
            grouped[dayKey].weatherIcons.push(item.weather[0]);
          });

          const dailyForecasts = Object.keys(grouped).map((dayKey) => {
            const dayData = grouped[dayKey];

            return {
              dt: dayData.dt,
              main: {
                temp_max: Math.max(...dayData.tempsMax),
                temp_min: Math.min(...dayData.tempsMin),
              },
              weather: [dayData.weatherIcons[0]], // можна вдосконалити: брати найчастіший стан
            };
          });

          setForecast(dailyForecasts.slice(0, 5));
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Forecast API error:", error);
          setLoaded(false);
        });
    }
  }, [props.coordinates]);

  if (loaded && forecast.length > 0) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map((dailyForecast, index) => (
            <div className="col-sm mt-2 mb-4" key={index}>
              <WeatherForecastDay
                data={dailyForecast}
                unit={props.unit}
                setUnit={props.setUnit}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="loading-forecast">Loading forecast...</div>;
  }
}