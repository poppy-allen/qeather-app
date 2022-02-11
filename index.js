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

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayTemperature(response) {
    let temperature = document.querySelector("#temp");
    let location = document.querySelector("#city");
    let weatherCondition = document.querySelector("#condition");
    let humidityPercent = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    let dateTime = document.querySelector("#date");
    let weatherIcon = document.querySelector("#icon");
    celsiusTemp = response.data.main.temp;
    temperature.innerHTML = Math.round(celsiusTemp);
    location.innerHTML = response.data.name;
    weatherCondition.innerHTML = response.data.weather[0].main;
    humidityPercent.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    dateTime.innerHTML = formatDateString(response.data.dt, response.data.timezone);
    weatherIcon.setAttribute("src", `images/${response.data.weather[0].icon}.svg`);

    getForecast(response.data.coord);
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

function clearValues() {
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
    let convertFahrenheit = (celsiusTemp * 9 / 5) + 32;
    let temperature = document.querySelector("#temp");
    temperature.innerHTML = Math.round(convertFahrenheit);
}

function convertCelsius() {
    let temperature = document.querySelector("#temp");
    temperature.innerHTML = Math.round(celsiusTemp);
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let weeklyForecast = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index > 0 && index < 7) {
            forecastHTML =
                forecastHTML +
                `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="images/${forecastDay.weather[0].icon}.svg" alt="#" width="50" />
        <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                )}°</span>
           <span class="weather-forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                )}°</span>
        </div>
      </div>`;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    weeklyForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "f25acbf494c6e1996ef769070be0a2e9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

search("London");

let celsiusTemp = null;
