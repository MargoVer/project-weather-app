let now = new Date();
let data = document.querySelector("#current-date");
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusrday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let year = now.getFullYear();

let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

data.innerHTML = `${hours}:${minutes} ${day}, ${month} ${date}`;

//get right time format for forecast
function hoursForecast(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//show current weather
function showWeather(response) {
  let locationNow = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let tempCelsius = Math.round(response.data.main.temp);
  let weatherConditions = document.querySelector("#weather-now");
  let humidityInput = document.querySelector("#humidity");
  let windInput = document.querySelector("#wind");

  locationNow.innerHTML = `${response.data.name}`;
  h2.innerHTML = `${tempCelsius}°C`;
  humidityInput.innerHTML = response.data.main.humidity;
  windInput.innerHTML = Math.round(response.data.wind.speed);

  weatherConditions.innerHTML = response.data.weather[0].description;
}
//display forecast

function showForecast(response) {
  let forecastHourly = document.querySelector("#forecast");
  forecastHourly.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];

    forecastHourly.innerHTML += `
   <div class="col">
   <h3 class="sunday"> ${hoursForecast(forecast.dt * 1000)}</h3>
            <img src="img/sun.png" class="images" height="80px" width="80px" />
             <h4> <strong> ${Math.round(
               forecast.main.temp_max
             )}°C </strong>/<span class="temper"> ${Math.round(
      forecast.main.temp_min
    )}°C </span> </h4>
            <p>${forecast.weather[0].description}</p>
           
          </div>`;
  }
}

//add a search engine
function search(city) {
  let apiKey = "b1f3a8a2d9fc90849bbd1b29224fc8ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function place(event) {
  event.preventDefault();
  let currentLocation = document.querySelector("#city-input");
  search(currentLocation.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentLocation.value}`;
}

search("Haarlem");
let town = document.querySelector("#search-city");
town.addEventListener("submit", place);
