function displayTemperature(response) {
    let temperature = document.querySelector("#temp");
    let location = document.querySelector("#city");
    let weatherCondition = document.querySelector("#condition");
    let humidityPercent = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    temperature.innerHTML = Math.round (response.data.main.temp);
    location.innerHTML = response.data.name;
    weatherCondition.innerHTML = response.data.weather[0].main;
    humidityPercent.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "f25acbf494c6e1996ef769070be0a2e9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);