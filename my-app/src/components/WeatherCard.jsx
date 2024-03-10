//importing useState to manage state components

import React, { useState } from "react";

//this is the main function(or the app itself). If i want ot integrade it in another page
export default function WeatherApp() {
//create variable that has two states: city(current city) and setCity(the city to update)
//city stores the entered city(it's empty first)
  const [city, setCity] = useState("");
//same with weather data  
  const [weatherData, setWeatherData] = useState(null);
//same with error message
  const [errorMessage, setErrorMessage] = useState("");
//same with the card
  const [displayCard, setDisplayCard] = useState(false);
//this is key created by the website we are using api from
  const apiKey = "fb9d3523270a92737da8804d4fe6dbe7";

//this variable handles input
//async means if javaScript has to wait for an operation to complete
//it will execute the rest of the code while waiting
  const handleSubmit = async (event) => {
//this is for preventing default form submission behaviour(reloading the page)
    event.preventDefault();
//checks if "city" has value
    if (city) {
//fetches data from getWeatherData
      try {
//if successfull updates weatherData through setWeatherData
//clears error
//displays card
        const data = await getWeatherData(city);
        setWeatherData(data);
        setErrorMessage("");
        setDisplayCard(true);
      } catch (error) {
//if fail updates weather data using setWeatherData to null
//displays error
//displays card
        setWeatherData(null);
        setErrorMessage("Enter a correct city.");
        setDisplayCard(true);
      }
//if city is empty displays error to enter a city      
    } else {
      displayError("Please enter a city");
    }
  };
//the async function is responsible for fetching the weather data for a given city
//async indicates that the function is asynchronous meaning it can perform that might take time like network request
//without blocking the main thread 
  const getWeatherData = async (city) => {
//
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
