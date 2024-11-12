document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "30bc33d885f1686e73d308a7edfda583";
  
    const tempValue = document.getElementById("temp-value");
    const maxTemp = document.getElementById("max-temp");
    const minTemp = document.getElementById("min-temp");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");
    const body = document.body;
  
    const cityInput = document.getElementById("city-input");
    const searchButton = document.getElementById("search-button");
  
    // Função para buscar os dados da API
    async function fetchWeatherData(city) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
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
  
    // Função para atualizar o layout com os dados
    function updateWeatherInfo(data) {
      const temperature = Math.round(data.main.temp);
      const tempMax = Math.round(data.main.temp_max);
      const tempMin = Math.round(data.main.temp_min);
      const humidityValue = data.main.humidity;
      const windSpeedValue = Math.round(data.wind.speed * 3.6); // Convertendo m/s para km/h
  
      // Atualizando os elementos
      tempValue.textContent = `${temperature}°C`;
      maxTemp.textContent = `Max: ${tempMax}°C`;
      minTemp.textContent = `Min: ${tempMin}°C`;
      humidity.textContent = `Humidity: ${humidityValue}%`;
      windSpeed.textContent = `Wind: ${windSpeedValue} km/h`;
  
      // Alterando a cor de fundo com base na temperatura
      if (temperature < 15) {
        body.style.backgroundColor = "#ADD8E6"; // Light Blue
      } else if (temperature <= 25) {
        body.style.backgroundColor = "#FFD700"; // Gold
      } else {
        body.style.backgroundColor = "#FF4500"; // Orange Red
      }
    }
  
    // Adicionando o evento de clique no botão
    searchButton.addEventListener("click", () => {
      const city = cityInput.value.trim();
      if (city) {
        fetchWeatherData(city);
      } else {
        alert("Please enter a city name!");
      }
    });
  });
  