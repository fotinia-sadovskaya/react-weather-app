import React from "react";
import "./Weather.css";

export default function Weather() {
  return (
    <div className="Weather">
      <form>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Enter a city.."
              className="form-control"
              autoFocus="on"
            />
          </div>
          <div className="col-3">
            <input type="Submit" value="Search" className="btn btn-info w-100" />
          </div>
        </div>
      </form>

      <h1>Burgas</h1>
      <ul>
        <li>Friday 18.00</li>
        <li>Broken Clouds</li>
      </ul>
      <div className="row">
        <div className="col-6">
          <img
            src="http://openweathermap.org/img/wn/04n@2x.png"
            alt="broken clouds"
          />
          7°C
        </div>
        <div className="col-6">
          <ul>
            <li>Presipitation 15%</li>
            <li>Humidity 100%</li>
            <li>Winnd 2.57 km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
