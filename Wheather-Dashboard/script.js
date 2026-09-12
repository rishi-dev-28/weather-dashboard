const cityInput = document.getElementById("city-input");

const searchBtn = document.getElementById("search-btn");

const weatherCard = document.getElementById("weather-card");

const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");

const temperature = document.getElementById("temperature");

const humidity = document.getElementById("humidity");

const windSpeed = document.getElementById("wind-speed");

const condition = document.getElementById("condition");

/* =========================
   API CONFIGURATION
========================= */

/*
   Get free API key from:
   https://openweathermap.org/api
*/

const apiKey = "a89913ec3f64182c013949e3c8ae2865";

/* =========================
   FETCH WEATHER
========================= */

async function getWeather(city) {

    try {

        errorMessage.textContent = "";

        weatherCard.style.display = "none";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        /* ERROR HANDLING */

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        /* PARSE NESTED JSON */

        const temp = data.main.temp;

        const hum = data.main.humidity;

        const wind = data.wind.speed;

        const weatherCondition = data.weather[0].main;

        /* RENDER DATA */

        cityName.textContent = data.name;

        temperature.textContent = `${temp} °C`;

        humidity.textContent = `${hum}%`;

        windSpeed.textContent = `${wind} km/h`;

        condition.textContent = weatherCondition;

        weatherCard.style.display = "block";

    }

    catch (error) {

        errorMessage.textContent = error.message;
    }
}

/* =========================
   EVENT LISTENERS
========================= */

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {

        getWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        const city = cityInput.value.trim();

        if (city !== "") {

            getWeather(city);
        }
    }
});