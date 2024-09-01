import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [unit, setUnit] = useState('metric');

  // edit spotify insert for mobile
  
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${apiUrl}?q=${location},${state},${country}&appid=${apiKey}&units=${unit}`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        console.error("Error finding location:", data.message);
        alert('Apologies! Location not found. Please try again.');
      }
    } catch (error) {
      console.error("Error finding location:", error);
      alert('Apologies! Location not found. Please try again.');
    }
  };

  const getTemperatureUnit = (unit) => {
    return unit === 'metric' ? '°C' : '°F';
  };

  const setBackgroundByWeather = (weatherCondition) => {
    let imageUrl;

    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        imageUrl = '/images/pexels-jess-loiterton-4319752.jpg';
        break;
      case 'clouds':
        imageUrl = '/images/pexels-fabian-wiktor-994605.jpg';
        break;
      case 'rain':
        imageUrl = '/images/pexels-iurii-laimin-14431017.jpg';
        break;
      case 'snow':
        imageUrl = '/images/pexels-kasuma-908644.jpg';
        break;
      default:
        imageUrl = '';
    }

    return imageUrl;
  };

  return (
    <div className="container">
      <div id="weather-img" style={{ backgroundImage: `url(${weather ? setBackgroundByWeather(weather.weather[0].main) : ''})` }}></div>
      <div className="content">
        <h1><marquee>Whatever Da Weather</marquee></h1>
        <div className="input-group">
          <label htmlFor="location-input">City:</label>
          <input
            type="text"
            id="location-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city"
          />
        </div>
        <div className="input-group">
          <label htmlFor="state-input">State:</label>
          <input
            type="text"
            id="state-input"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter state"
          />
        </div>
        <div className="input-group">
          <label htmlFor="country-input">Country:</label>
          <input
            type="text"
            id="country-input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
          />
        </div>
        <div className="temp-option">
          <label>
            <input
              type="radio"
              value="metric"
              checked={unit === 'metric'}
              onChange={() => setUnit('metric')}
            />
            Metric (°C)
          </label>
          <label>
            <input
              type="radio"
              value="imperial"
              checked={unit === 'imperial'}
              onChange={() => setUnit('imperial')}
            />
            Imperial (°F)
          </label>
        </div>
        <div className="button-container">
          <button id="check-weather-btn" onClick={fetchWeather}>Check Weather</button>
        </div>
        {weather && weather.weather && weather.main && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>Condition: {weather.weather[0].main}</p>
            <p>Temperature: {Math.round(weather.main.temp)} {getTemperatureUnit(unit)}</p>
            <p>High: {Math.round(weather.main.temp_max)} {getTemperatureUnit(unit)}</p>
            <p>Low: {Math.round(weather.main.temp_min)} {getTemperatureUnit(unit)}</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        )}
      </div>
      <div className="iframe">
        <iframe 
          src="https://open.spotify.com/embed/track/0GveDUsgYoUwExpWRi6Yx0?utm_source=generator" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy">
        </iframe>
      </div>
    </div>
  );
};

export default App;
