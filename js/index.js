
const cities = {
  "New York City": { latitude: 40.7128, longitude: -74.0059 },
  "Los Angeles": { latitude: 34.0522, longitude: -118.2437 },
  "Chicago": { latitude: 41.8781, longitude: -87.6298 },
  "Houston": { latitude: 29.7604, longitude: -95.3698 },
  "Phoenix": { latitude: 33.4484, longitude: -112.0740 },
  "Philadelphia": { latitude: 39.9526, longitude: -75.1652 },
  "San Antonio": { latitude: 29.4241, longitude: -98.4936 },
  "San Diego": { latitude: 32.7153, longitude: -117.1611 },
  "Dallas": { latitude: 32.7942, longitude: -96.7699 },
  "San Jose": { latitude: 37.3382, longitude: -121.8863 }
};

const citySelect = document.getElementById('city-select');
const weatherInfo = document.getElementById('weather-info');

// Populate the dropdown with city names
for (const city in cities) {
  const option = document.createElement('option');
  option.value = city;
  option.textContent = city;
  citySelect.appendChild(option);
}

const fetchWeatherData = async (latitude, longitude) => {
  try {
    // Make the fetch request
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=wind_speed_10m_max`);
    
    // Check for successful response
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Display user-friendly error message
    weatherInfo.innerHTML = `An error occurred while fetching weather data. Please try again later.`;
  }
};

const displayWeatherData = (city, weatherData) => {
  const windSpeed = weatherData.daily.wind_speed_10m_max[0];

  weatherInfo.innerHTML = `
    <h3>Weather Info for ${city}</h3>
    <p>Daily Maximum Wind Speed: ${windSpeed} m/s</p>
  `;
};

citySelect.addEventListener('change', async function() {
  const city = this.value;
  if (city) {
    const { latitude, longitude } = cities[city];
    const weatherData = await fetchWeatherData(latitude, longitude);
    if (weatherData) {
      displayWeatherData(city, weatherData);
    }
  } else {
    weatherInfo.innerHTML = 'City weather Info';
  }
});