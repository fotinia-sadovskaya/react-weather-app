// src/WeatherForecastDay.js
import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  function maxTemperature() {
    let temperature = Math.round(props.data.main.temp_max);
    return `${temperature}°`;
  }

  function minTemperature() {
    let temperature = Math.round(props.data.main.temp_min);
    return `${temperature}°`;
  }

  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  return (
    <div className="WeatherForecastDay text-center">
      <div className="WeatherForecast-day">{day()}</div>
      {props.data.weather && props.data.weather[0] ? (
        <WeatherIcon code={props.data.weather[0].icon} size={36} />
      ) : (
        <div>No icon</div>
      )}
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperature-max">
          {maxTemperature()}
        </span>
        <span className="WeatherForecast-separator"> | </span>
        <span className="WeatherForecast-temperature-min">
          {minTemperature()}
        </span>
        <span className="WeatherForecast-unit">
          {props.unit === "celsius" ? "C" : "F"}
        </span>
      </div>

    </div>
  );
}
