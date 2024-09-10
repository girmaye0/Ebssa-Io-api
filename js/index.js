const states = {
    "California": { latitude: 37.7749, longitude: -122.4194 },
    "Texas": { latitude: 31.0545, longitude: -97.5664 },
    "Florida": { latitude: 27.9942, longitude: -82.4434 },
    "New York": { latitude: 40.7128, longitude: -74.0059 },
    "Illinois": { latitude: 40.1133, longitude: -88.2244 },
    "Pennsylvania": { latitude: 40.5897, longitude: -77.2604 },
    "Ohio": { latitude: 40.3888, longitude: -83.0071 },
    "Michigan": { latitude: 42.7312, longitude: -84.3586 },
    "Georgia": { latitude: 33.0406, longitude: -84.2377 },
    "Washington": { latitude: 47.6062, longitude: -122.3321 }
};

const stateSelect = document.getElementById('state-select');
const weatherInfo = document.getElementById('weather-info');

// Populate the dropdown with states
for (const state in states) {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
}

const fetchWeatherData = async (latitude, longitude) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=relative_humidity_2m&daily=precipitation_sum&temperature_unit=fahrenheit&timezone=America%2FNew_York`);
    const data = await response.json();
    return data;
};

const displayWeatherData = (state, weatherData) => {
    const hourlyHumidity = weatherData.hourly.relative_humidity_2m;
    const dailyPrecipitation = weatherData.daily.precipitation_sum;

    weatherInfo.innerHTML = `
        <h3>Weather Info for ${state}</h3>
        <p>Hourly Relative Humidity: ${hourlyHumidity.join(', ')}</p>
        <p>Daily Precipitation Sum: ${dailyPrecipitation.join(', ')}</p>
    `;
};

stateSelect.addEventListener('change', async (event) => {
    const selectedState = event.target.value;
    if (selectedState) {
        const { latitude, longitude } = states[selectedState];
        const weatherData = await fetchWeatherData(latitude, longitude);
        displayWeatherData(selectedState, weatherData);
    } else {
        weatherInfo.innerHTML = 'State weather Info';
    }
});
