import React from "react";
import FormatedDate from "./FormatedDate";
import WeathrIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1>
        {props.data.city}<span className="smaller">{props.data.country}</span>
      </h1>
      <ul>
        <li>
          <FormatedDate date={props.data.date} />
        </li>
        <li className="text-capitalize">{props.data.description}</li>
      </ul>
      <div className="row">
        <div className="col-sm-4 mt-3 text-center">
          <WeatherTemperature celsius={props.data.temperature} />
        </div>
        <div className="col-sm-4 mt-3 text-center">
          <WeathrIcon code={props.data.icon} size={72} />
        </div>

        <div className="col-sm-4 mt-3 text-center">
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
