// --- Element Selection ---
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorMessage = document.getElementById('errorMessage');

const cityNameEl = document.getElementById('cityName');
const weatherIconEl = document.getElementById('weatherIcon');
const temperatureEl = document.getElementById('temperature');
const weatherDescriptionEl = document.getElementById('weatherDescription');

// --- API Configuration ---
// IMPORTANT: Replace 'YOUR_API_KEY' with your actual key from OpenWeatherMap
const apiKey = '66808975402d52c66dc47bb5d4d9d02d';


// --- Event Listeners ---
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submission
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});


async function getWeather(city) {
    // This is the new URL for your serverless function
    // It passes the city as a query parameter
    const apiUrl = `/.netlify/functions/get-weather?city=${city}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        
        // This part is important: OpenWeatherMap might pass its own errors through
        if (data.cod && data.cod !== 200) {
            throw new Error(data.message || 'City not found');
        }

        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}


function displayWeather(data) {
    // Hide error message and show weather data
    errorMessage.style.display = 'none';
    weatherDisplay.style.display = 'block';

    // Extract data from the API response
    const city = data.name;
    const country = data.sys.country;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Update the DOM with the new data
    cityNameEl.textContent = `${city}, ${country}`;
    temperatureEl.textContent = `${temperature}°C`;
    weatherDescriptionEl.textContent = description;
    weatherIconEl.src = iconUrl;
    weatherIconEl.alt = description;
}

function displayError(message) {
    // Hide weather data and show error message
    weatherDisplay.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = `Error: ${message}. Please try again.`;
}