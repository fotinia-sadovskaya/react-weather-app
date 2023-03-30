import React from "react";
import FormatedDate from "./FormatedDate";
import WeathrIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1>
        {props.data.city}, {props.data.country}
      </h1>
      <ul>
        <li>
          <FormatedDate date={props.data.date} />
        </li>
        <li className="text-capitalize">{props.data.description}</li>
      </ul>
      <div className="row">
        <div className="col-sm-6 mt-3">
          <div className="d-flex">
            <div>
              <WeathrIcon code={props.data.icon} size={56} />
            </div>
            <div>
              <WeatherTemperature celsius={props.data.temperature} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 mt-3">
          <ul className="weather-date">
            <li>Humidity: {props.data.humidity} %</li>
            <li>Wind: {props.data.wind} m/s</li>
            <li>Feels like: {Math.round(props.data.feel)}°C</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
