// current date
let now = new Date();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
if (hour < 10) {
  hour = "0" + hour;
}
let date = now.getDate();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let h3 = document.querySelector("h3");
h3.innerHTML = `${date} ${month} ${year}`;

let currentHour = document.querySelector("#hours");
currentHour.innerHTML = `${hour}`;

let currentMinutes = document.querySelector("#minutes");
currentMinutes.innerHTML = `${minutes}`;

// searchForm
function searchCity(city) {
  let apiKey = "b79e0a0cc3fca65ee539979ef484d2b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${(searchInput.value = toUpper(searchInput.value))}`;
  searchCity(searchInput.value);
}

function showTemperature(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${response.data.name}`;

  let temperature = Math.round(response.data.main.temp);
  let h4 = document.querySelector("#currentTemp");
  h4.innerHTML = `${temperature}°`;

  let temp_max = Math.round(response.data.main.temp_max);
  let highTemp = document.querySelector("#currentHigh");
  highTemp.innerHTML = `${temp_max}°`;

  let temp_min = Math.round(response.data.main.temp_min);
  let lowTemp = document.querySelector("#currentLow");
  lowTemp.innerHTML = `${temp_min}°`;

  let humid = response.data.main.humidity;
  let humidity = document.querySelector("#currentHumidity");
  humidity.innerHTML = `${humid}%`;

  // still working on it
  let sunrise = document.querySelector("#currentSunrise");
  sunrise.innerHTML = response.data.sys.sunrise;

  // still working on it
  let sunset = document.querySelector("#currentSunset");
  sunset.innerHTML = response.data.sys.sunset;

  // can't find data for rain
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);

searchCity("Warsaw");

function toUpper(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
}

// current weather
function searchLocation(position) {
  let apiKey = "b79e0a0cc3fca65ee539979ef484d2b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click", getCurrentLocation);
