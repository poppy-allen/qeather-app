function formatDateString(utcTimeInSeconds, offsetInSeconds) {
    const timestamp = (utcTimeInSeconds + offsetInSeconds) * 1000;
    let date = new Date(timestamp);
    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`; 
    }

function displayTemperature(response) {
    let temperature = document.querySelector("#temp");
    let location = document.querySelector("#city");
    let weatherCondition = document.querySelector("#condition");
    let humidityPercent = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    let dateTime = document.querySelector("#date");
    let weatherIcon = document.querySelector("#icon");
    displayForecast();
    celsiusTemp = response.data.main.temp;
    temperature.innerHTML = Math.round (celsiusTemp);
    location.innerHTML = response.data.name;
    weatherCondition.innerHTML = response.data.weather[0].main;
    humidityPercent.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    dateTime.innerHTML = formatDateString(response.data.dt, response.data.timezone);
    weatherIcon.setAttribute("src", `images/${response.data.weather[0].icon}.svg`);
}

function search(city) {
    let apiKey = "f25acbf494c6e1996ef769070be0a2e9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature).catch(clearValues);   
    
}

function handleSubmit() {
    let cityInput = document.querySelector("#city-name");
    search(cityInput.value);
}

function clearValues(){
    let temperature = document.querySelector("#temp");
    let location = document.querySelector("#city");
    let weatherCondition = document.querySelector("#condition");
    let humidityPercent = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    let dateTime = document.querySelector("#date");
    let weatherIcon = document.querySelector("#icon");
    temperature.innerHTML = '';
    location.innerHTML = '';
    weatherCondition.innerHTML = '';
    humidityPercent.innerHTML = '';
    windSpeed.innerHTML = '';
    dateTime.innerHTML = '';
    weatherIcon.setAttribute("src", ``);
}

function convertFahrenheit() {
    let convertFahrenheit = (celsiusTemp * 9/5) + 32;
    let temperature = document.querySelector("#temp");
    temperature.innerHTML = Math.round(convertFahrenheit);
    }

function convertCelsius() {
    let temperature = document.querySelector("#temp");
    temperature.innerHTML = Math.round(celsiusTemp);
}

function displayForecast() {
    let weeklyForecast = document.querySelector("#forecast");
    let forecastDays = ["Thu", "Fri", "Sat", "Sun"];
    let forecastHTML = `<div class="row">`;
    forecastDays.forEach(function (day) { 
    forcastHTML = forecastHTML + `
    <div class="col-2">
      <div class="weather-forecast-date">$(day)</div>
      <img src="images/ 11d.svg" alt="#" width="40" />
      <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max"> 18°C </span>
        | <span class="weather-forecast-temp-min">12°C </span>
      </div>
    </div>`;
    });
    
    forecastHTML = forecastHTML + `</div>`;
    weeklyForecast.innerHTML = forecastHTML;
    console.log(forecastHTML);
}

    let celsiusTemp = null;
