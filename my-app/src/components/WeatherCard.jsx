import React, { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayCard, setDisplayCard] = useState(false);
  const apiKey = "fb9d3523270a92737da8804d4fe6dbe7";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (city) {
      try {
        const data = await getWeatherData(city);
        setWeatherData(data);
        setErrorMessage("");
        setDisplayCard(true);
      } catch (error) {
        setWeatherData(null);
        setErrorMessage("Enter a correct city.");
        setDisplayCard(true);
      }
    } else {
      displayError("Please enter a city");
    }
  };

  const getWeatherData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Could not fetch data");
    }

    return await response.json();
  };

  const displayWeatherInfo = (data) => {
    return (
      <>
        <h1 className="cityDisplay">{data.name}</h1>
        <p className="tempDisplay">{data.main.temp}°C</p>
        <p className="humidityDisplay">Humidity: {data.main.humidity}%</p>
        <p className="descDisplay">{data.weather[0].description}</p>
        <p className="weatherEmoji">{getWeatherEmoji(data.weather[0].id)}</p>
      </>
    );
  };

  const getWeatherEmoji = (weatherId) => {
    // Implement your logic to get the weather emoji based on the weather ID
    // For simplicity, a basic example is shown:
    if (weatherId >= 200 && weatherId < 300) {
      return "⛈"; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 500) {
      return "🌧"; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
      return "🌧"; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
      return "❄️"; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
      return "🌫"; // Atmosphere
    } else if (weatherId === 800) {
      return "☀️"; // Clear sky
    } else if (weatherId > 800 && weatherId < 900) {
      return "☁️"; // Clouds
    } else {
      return "❓"; // Unknown
    }
  };

  const displayError = (message) => {
    setErrorMessage(message);
    setDisplayCard(true);
  };

  return (
    <>
      <form className="weatherForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="cityInput"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {displayCard && (
        <div className="card" style={{ display: "flex" }}>
          {errorMessage ? (
            <p className="errorDisplay">{errorMessage}</p>
          ) : (
            <>{weatherData && displayWeatherInfo(weatherData)}</>
          )}
        </div>
      )}
    </>
  );
}
