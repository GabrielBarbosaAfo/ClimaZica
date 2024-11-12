// index.js
document.getElementById('consultar').addEventListener('click', consultarCidade);
document.getElementById('cidade').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        consultarCidade();
    }
});

function consultarCidade() {
    const cidade = document.getElementById("cidade").value;
    const unidade = document.getElementById("unidade").value;
    const apiKey = '30bc33d885f1686e73d308a7edfda583'; 

    if (!cidade) {
        alert("Por favor, insira o nome da cidade.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=${unidade}&appid=${apiKey}`;
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            if (data.cod !== 200) {
                alert("Cidade não encontrada!");
                return;
            }

            const temperatura = data.main.temp;
            const tempMin = data.main.temp_min;
            const tempMax = data.main.temp_max;
            const umidade = data.main.humidity;
            const vento = data.wind.speed;
            const condicao = data.weather[0].main;
            const descricao = data.weather[0].description;

            const descricaoPortugues = {
                "clear sky": "céu limpo",
                "few clouds": "poucas nuvens",
                "scattered clouds": "nuvens dispersas",
                "broken clouds": "nuvens quebradas",
                "shower rain": "chuva leve",
                "rain": "chuva",
                "thunderstorm": "tempestade",
                "snow": "neve",
                "mist": "névoa",
                "overcast clouds": "nublado"
            };

            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

            const descricaoTraduzida = descricaoPortugues[descricao.toLowerCase()] || descricao;

            document.getElementById("temp-resultado").textContent = `🌡️ Temperatura: ${temperatura.toFixed(1)}°`;
            document.getElementById("temp-maxmin").textContent = `📈 Máx: ${tempMax.toFixed(1)}°, 📉 Mín: ${tempMin.toFixed(1)}°`;
            document.getElementById("umidade").textContent = `💧 Umidade: ${umidade}%`;
            document.getElementById("vento").textContent = `💨 Vento: ${vento} m/s`;
            document.getElementById("weather-description").textContent = descricaoTraduzida.charAt(0).toUpperCase() + descricaoTraduzida.slice(1);
            document.getElementById("sunrise").textContent = `🌅 Nascer do Sol: ${sunrise}`;
            document.getElementById("sunset").textContent = `🌇 Pôr do Sol: ${sunset}`;

            const weatherIcon = document.getElementById("weather-icon");
            if (condicao === "Clear") {
                weatherIcon.textContent = "☀️";
            } else if (condicao === "Clouds") {
                weatherIcon.textContent = "☁️";
            } else if (condicao === "Rain" || condicao === "Drizzle") {
                weatherIcon.textContent = "🌧️";
            } else if (condicao === "Thunderstorm") {
                weatherIcon.textContent = "⛈️";
            } else if (condicao === "Snow") {
                weatherIcon.textContent = "❄️";
            } else {
                weatherIcon.textContent = "🌫️"; 
            }

            document.getElementById("resultado").style.display = "block";

        } else {
            alert("Erro ao buscar dados do clima. Tente novamente.");
        }
    };

    xhr.onerror = function() {
        alert("Erro de conexão. Verifique sua rede.");
    };

    xhr.send();
}
