// src/WeatherForecast.js
import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
import LoadingSpinner from "./LoadingSpinner";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (props.coordinates?.lat && props.coordinates?.lon) {
      setLoaded(false);

      const { lon, lat } = props.coordinates;
      const apiKey = "583543d42b8605a7c28a20d072be705c";
      const units = "metric";
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

      axios.get(apiUrl)
        .then((response) => {
          const tzOffsetSec = response.data.city?.timezone ?? 0; // seconds
          const list = response.data.list || [];

          // Групуємо по локальній даті (з урахуванням timezone)
          const grouped = {};
          list.forEach((item) => {
            const utcMs = item.dt * 1000;
            const localMs = utcMs + tzOffsetSec * 1000;
            const localDate = new Date(localMs);

            const dayKey = localDate.toISOString().slice(0, 10); // YYYY-MM-DD (локалізовано вручну)

            if (!grouped[dayKey]) {
              grouped[dayKey] = { items: [], dtSample: item.dt };
            }
            grouped[dayKey].items.push({ item, localMs });
          });

          // Формуємо денні дані: реальні min/max + іконка найближча до 12:00
          const dailyForecasts = Object.keys(grouped)
            .sort() // хронологічно
            .map((dayKey) => {
              const { items, dtSample } = grouped[dayKey];

              const tempsMax = items.map(({ item }) => item.main.temp_max);
              const tempsMin = items.map(({ item }) => item.main.temp_min);

              const tempMax = Math.max(...tempsMax);
              const tempMin = Math.min(...tempsMin);

              // 12:00 локального часу цього дня (у мс, локалізовано)
              const noonLocal = new Date(
                new Date(items[0].localMs).setHours(12, 0, 0, 0)
              ).getTime();

              // Знаходимо запис, найближчий до 12:00
              let closest = items[0];
              let bestDiff = Math.abs(items[0].localMs - noonLocal);
              for (let i = 1; i < items.length; i++) {
                const diff = Math.abs(items[i].localMs - noonLocal);
                if (diff < bestDiff) {
                  bestDiff = diff;
                  closest = items[i];
                }
              }

              const iconEntry = closest.item.weather?.[0] ?? items[0].item.weather?.[0];

              return {
                dt: dtSample, // репрезентативний timestamp
                main: { temp_max: tempMax, temp_min: tempMin },
                weather: iconEntry ? [iconEntry] : [],
              };
            })
            .slice(0, 5); // тільки 5 днів

          setForecast(dailyForecasts);
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
      <div className="WeatherForecast fade-in">
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
    return <LoadingSpinner />;
  }
}