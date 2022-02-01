function displayDate(timestamp) {
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
    console.log(response.data);
    let temperature = document.querySelector("#temp");
    let location = document.querySelector("#city");
    let weatherCondition = document.querySelector("#condition");
    let humidityPercent = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    let dateTime = document.querySelector("#date");
    let weatherIcon = document.querySelector("#icon");
    temperature.innerHTML = Math.round (response.data.main.temp);
    location.innerHTML = response.data.name;
    weatherCondition.innerHTML = response.data.weather[0].main;
    humidityPercent.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    dateTime.innerHTML = displayDate(response.data.dt * 1000);
    weatherIcon.setAttribute("src", `images/${response.data.weather[0].icon}.svg`);
}

let apiKey = "f25acbf494c6e1996ef769070be0a2e9";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);