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

  changeImage(response.data.weather[0].icon);
  locationNow.innerHTML = `${response.data.name}`;
  h2.innerHTML = `${tempCelsius}°C`;
  humidityInput.innerHTML = response.data.main.humidity;
  windInput.innerHTML = Math.round(response.data.wind.speed);
  weatherConditions.innerHTML = response.data.weather[0].description;
}
//display icon
function changeImage(icon) {
  let iconCondition = document.querySelector("#condition");
  if (icon === "01d") {
    iconCondition.setAttribute("src", `img/sunfull.png`);
  } else if (icon === "02d") {
    iconCondition.setAttribute("src", `img/suncloud.png`);
  } else if (icon === "03d" || icon === "03n") {
    iconCondition.setAttribute("src", `img/rain.png`);
  } else if (icon === "04d" || icon === "04n") {
    iconCondition.setAttribute("src", `img/cloud.png`);
  } else if (icon === "09d" || icon === "09n") {
    iconCondition.setAttribute("src", `img/rain.png`);
  } else if (icon === "10d") {
    iconCondition.setAttribute("src", `img/sunrain2.png`);
  } else if (icon === "11d" || icon === "11n") {
    iconCondition.setAttribute("src", `img/thunder.png`);
  } else if (icon === "13d" || icon === "13n") {
    iconCondition.setAttribute("src", `img/snow2.png`);
  } else if (icon === "50d" || icon === "50n") {
    iconCondition.setAttribute("src", `img/mist.png`);
  } else if (icon === "01n") {
    iconCondition.setAttribute("src", `img/moon.png`);
  } else if (icon === "02n") {
    iconCondition.setAttribute("src", `img/mooncloud.png`);
  } else if (icon === "10n") {
    iconCondition.setAttribute("src", `img/moonrain.png`);
  } else {
    iconCondition.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
  }
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


  <img
       src="${changeForecastimage(forecast.weather[0].icon)}"
      id="weatherpic"
      class="images"
      height="80px"
      width="80px"
  /> 
            
             <h4> <strong> ${Math.round(
               forecast.main.temp_max
             )}°C </strong>/<span class="temper"> ${Math.round(
      forecast.main.temp_min
    )}°C </span> </h4>
            <p>${forecast.weather[0].description}</p>
           
          </div>`;
  }
}
//forecast icon
function changeForecastimage(iconfor) {
  let iconforecast = document.querySelector("#weatherpic");
  if (iconfor === "01d") {
    iconforecast.setAttribute("src", `img / sunfull.png`);
  } else {
    iconforecast.setAttribute("src", `img / cloud.png`);
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

//<img
//src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
//id="weatherpic"
//class="images"
//height="80px"
//width="80px"

///>
