import React from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="Burgas" />
        <footer>
          This project was coded by{" "}
          <a
            href="https://www.behance.net/fotinia_sadovskaya"
            target="_blank"
            rel="noopener noreferrer"
          >
            Svitlana Voronko
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/fotinia-sadovskaya/react-weather-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a href="" target="_blank" rel="noopener noreferrer">
            hosted on Netlify
          </a>
        </footer>
      </div>
    </div>
  );
}


