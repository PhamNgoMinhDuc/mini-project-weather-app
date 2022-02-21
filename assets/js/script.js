let APP_ID = "5d498746e50dfa0384c6c628e8891492";
let DEFAULT = "--";

let searchInput = document.querySelector("#search-input");
let cityName = document.querySelector(".city-name");
let weatherState = document.querySelector(".weather-state");
let weatherIcon = document.querySelector(".weather-icon");
let temperature = document.querySelector(".temperature");

let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".windspeed");

let additinal = document.querySelector(".additinal-section");

searchInput.addEventListener("change", (e) => {
    fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        e.target.value +
        "&appid=" +
        APP_ID +
        "&lang=vi"
    ).then(async(res) => {
        if (res.status !== 200) {
            cityName.classList.add("hide");
            weatherState.classList.add("hide");
            weatherIcon.classList.add("hide");
            temperature.classList.add("hide");
            additinal.classList.add("hide");
        } else {
            cityName.classList.remove("hide");
            weatherState.classList.remove("hide");
            weatherIcon.classList.remove("hide");
            temperature.classList.remove("hide");
            additinal.classList.remove("hide");

            const data = await res.json();
            cityName.innerHTML = data.name || DEFAULT;
            weatherState.innerHTML = data.weather[0].description || DEFAULT;
            weatherIcon.setAttribute(
                "src",
                `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            );
            temperature.innerHTML = Math.round(data.main.temp - 273.15) || DEFAULT;

            sunrise.innerHTML =
                moment.unix(data.sys.sunrise).format("H:mm") || DEFAULT;
            sunset.innerHTML = moment.unix(data.sys.sunset).format("H:mm") || DEFAULT;
            humidity.innerHTML = data.main.humidity + " %" || DEFAULT;
            windSpeed.innerHTML = data.wind.speed.toFixed(2) + " Km/h" || DEFAULT;
        }
    });
});