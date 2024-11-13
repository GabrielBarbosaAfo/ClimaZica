document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "30bc33d885f1686e73d308a7edfda583";

  const tempValue = document.getElementById("temp-value");
  const maxTemp = document.getElementById("max-temp");
  const minTemp = document.getElementById("min-temp");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");
  const sunriseTime = document.getElementById("sunrise");
  const sunsetTime = document.getElementById("sunset");
  const weatherIcon = document.getElementById("weather-icon");
  const body = document.body;

  const cityInput = document.getElementById("city-input");
  const searchButton = document.getElementById("search-button");
  const unitSelector = document.getElementById("unit-selector");

  let currentUnit = "metric"; // Default is Celsius (metric system)

  async function fetchWeatherData(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${currentUnit}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found!");
      }
      const data = await response.json();
      updateWeatherInfo(data);
    } catch (error) {
      alert(error.message);
    }
  }

  function updateWeatherInfo(data) {
    const temperature = Math.round(data.main.temp);
    const tempMax = Math.round(data.main.temp_max);
    const tempMin = Math.round(data.main.temp_min);
    const humidityValue = data.main.humidity;
    const windSpeedValue = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;

    tempValue.textContent = `${temperature}${getUnitSymbol()}`;
    maxTemp.textContent = `Max: ${tempMax}${getUnitSymbol()}`;
    minTemp.textContent = `Min: ${tempMin}${getUnitSymbol()}`;
    humidity.textContent = `Humidity: ${humidityValue}%`;
    windSpeed.textContent = `Wind: ${windSpeedValue} km/h`;
    sunriseTime.textContent = `Sunrise: ${sunrise}`;
    sunsetTime.textContent = `Sunset: ${sunset}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = description;

    // Adjust background color based on temperature
    if (currentUnit === "metric" && temperature < 15) {
      body.style.backgroundColor = "#ADD8E6";
    } else if (currentUnit === "metric" && temperature <= 25) {
      body.style.backgroundColor = "#FFD700";
    } else {
      body.style.backgroundColor = "#FF4500";
    }
  }

  function getUnitSymbol() {
    switch (currentUnit) {
      case "metric":
        return "°C";
      case "imperial":
        return "°F";
      case "standard":
        return "K";
      default:
        return "";
    }
  }

  searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeatherData(city);
    } else {
      alert("Please enter a city name!");
    }
  });

  cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const city = cityInput.value.trim();
      if (city) {
        fetchWeatherData(city);
      } else {
        alert("Please enter a city name!");
      }
    }
  });

  unitSelector.addEventListener("change", (event) => {
    currentUnit = event.target.value;
    const city = cityInput.value.trim();
    if (city) {
      fetchWeatherData(city);
    }
  });
});
