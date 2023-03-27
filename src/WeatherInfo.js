import React from "react";
import FormatedDate from "./FormatedDate";
import WeathrIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1>{props.data.city}</h1>
      <ul>
        <li>
          <FormatedDate date={props.data.date} />
        </li>
        <li className="text-capitalize">{props.data.description}</li>
      </ul>
      <div className="row mt-3">
        <div className="col-6">
          <div className="d-flex">
            <div>
              <WeathrIcon code={props.data.icon} />
            </div>
            <div>
              <WeatherTemperature celsius={props.data.temperature} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <ul className="weather-date">
            <li>Humidity {props.data.humidity} %</li>
            <li>Winnd {props.data.wind} km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
