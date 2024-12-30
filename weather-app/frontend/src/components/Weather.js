import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Nairobi");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`/api/weather?city=${city}`);
        setWeatherData(response.data);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage("Error fetching weather data");
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <h1>Weather in {city}</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Description: {weatherData.description}</p>
          <p>Humidity: {weatherData.humidity}%</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
      />
    </div>
  );
};

export default Weather;
