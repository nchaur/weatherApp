import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=70adec65b950111162b2f37c7fc2dd0c&units=imperial`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className={typeof data.main !== "undefined" ? (data.main.temp > 70 ? "app warm" : "app cold") : "app"}>
      <h1 className="weatherTitle">The weather app</h1>
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter location"
        ></input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">{data.main ? <h1>{data.main.temp.toFixed()}ºF</h1> : null}</div>
          <div className="description">{data.weather ? <p>{data.weather[0].main}</p> : null}</div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like.toFixed()} ºF</p> : null}
              <p className="bold">Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p className="bold">Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <p className="bold"> Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
