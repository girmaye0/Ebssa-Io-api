const temperaturesList = document.getElementById('temperatures-list');
const loadingMessage = document.getElementById('loading-message');

// Assuming cities object is defined elsewhere with city names as keys and coordinates as values
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
  "San Jose": { latitude: 37.3382, longitude: -121.8863 },
  "Austin": { latitude: 30.2672, longitude: -97.7431 },
  "Jacksonville": { latitude: 30.3322, longitude: -81.6557 },
  "San Francisco": { latitude: 37.7749, longitude: -122.4194 },
  "Columbus": { latitude: 39.9612, longitude: -82.9988 },
  "Indianapolis": { latitude: 39.7684, longitude: -86.1581 }
};

async function fetchCityTemperatures() {
  const cityTemperatures = {};
  for (const cityName in cities) {
    const { latitude, longitude } = cities[cityName];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.current) {
      cityTemperatures[cityName] = data.current.temperature_2m;
    } else {
      console.error(`Error fetching temperature for ${cityName}`);
    }
  }
  return cityTemperatures;
}

async function displayTemperatures() {
  try {
    loadingMessage.style.display = 'block';

    const cityTemperatures = await fetchCityTemperatures();
    displayTemperaturesList(cityTemperatures);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    temperaturesList.textContent = 'An error occurred while fetching weather data. Please try again later.';
  } finally {
    loadingMessage.style.display = 'none';
  }
}

function displayTemperaturesList(temperatures) {
  temperaturesList.innerHTML = ''; // Clear existing content
  for (const city in temperatures) {
    const temperature = temperatures[city];
    const listItem = document.createElement('li');
    listItem.textContent = `${city}: ${temperature}°C`;
    temperaturesList.appendChild(listItem);
  }
}

displayTemperatures();





// const temperaturesList = document.getElementById('temperatures-list');
// const loadingMessage = document.getElementById('loading-message'); 

// async function fetchStateTemperatures() {
//   const cities = {
//     "New York City": { latitude: 40.7128, longitude: -74.0059 },
//     "Los Angeles": { latitude: 34.0522, longitude: -118.2437 },
//     "Chicago": { latitude: 41.8781, longitude: -87.6298 },
//     "Houston": { latitude: 29.7604, longitude: -95.3698 },
//     "Phoenix": { latitude: 33.4484, longitude: -112.0740 },
//     "Philadelphia": { latitude: 39.9526, longitude: -75.1652 },
//     "San Antonio": { latitude: 29.4241, longitude: -98.4936 },
//     "San Diego": { latitude: 32.7153, longitude: -117.1611 },
//     "Dallas": { latitude: 32.7942, longitude: -96.7699 },
//     "San Jose": { latitude: 37.3382, longitude: -121.8863 }
//   };

//   const stateTemperatures = {};
//   for (const stateName in states) {
//     const { latitude, longitude } = states[stateName];
//     const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.current) {
//       stateTemperatures[stateName] = data.current.temperature_2m;
//     } else {
//       console.error(`Error fetching temperature for ${stateName}`);
//     }
//   }
//   return stateTemperatures;
// }

// async function displayTemperatures() {
//   try {
//         loadingMessage.style.display = 'block';

//     const stateTemperatures = await fetchStateTemperatures();
//     displayTemperaturesList(stateTemperatures);
//   } catch (error) {
//     console.error('Error fetching weather data:', error);
//     temperaturesList.textContent = 'An error occurred while fetching weather data. Please try again later.';
//   } finally {
//         loadingMessage.style.display = 'none';
//   }
// }

// function displayTemperaturesList(temperatures) {
//   temperaturesList.innerHTML = ''; 
//   for (const state in temperatures) {
//     const temperature = temperatures[state];
//     const listItem = document.createElement('li');
//     listItem.textContent = `${state}: ${temperature}°C`;
//     temperaturesList.appendChild(listItem);
//   }
// }

// displayTemperatures();