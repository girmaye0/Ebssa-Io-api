const temperaturesList = document.getElementById('temperatures-list');

async function fetchStateTemperatures() {
  const states = { // Assuming you have state coordinates in an object
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

  const stateTemperatures = {};
  for (const stateName in states) {
    const { latitude, longitude } = states[stateName];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.current) {
      stateTemperatures[stateName] = data.current.temperature_2m;
    } else {
      console.error(`Error fetching temperature for ${stateName}`);
    }
  }
  return stateTemperatures;
}

async function displayTemperatures() {
  try {
    const stateTemperatures = await fetchStateTemperatures();
    displayTemperaturesList(stateTemperatures);
  } catch (error) {
    console.error('Error fetching state temperatures:', error);
    temperaturesList.textContent = 'Error fetching temperatures.';
  }
}

function displayTemperaturesList(temperatures) {
  for (const state in temperatures) {
    const temperature = temperatures[state];
    const listItem = document.createElement('li');
    listItem.textContent = `${state}: ${temperature}°C`;
    temperaturesList.appendChild(listItem);
  }
}

displayTemperatures();