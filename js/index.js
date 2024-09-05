

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
  
  // Function to construct the API URL with multiple coordinates and daily rain
   function buildWeatherUrl(selectedStates){
    const latitudes = [];
    const longitudes = [];
    for (const stateName of selectedStates) {
      const coords = states[stateName];
      if (coords) {
        latitudes.push(coords.latitude);
        longitudes.push(coords.longitude);
      } else {
        console.error(`Coordinates not found for state: ${stateName}`);
      }
    }
  
    const latitudeString = latitudes.join(',');
    const longitudeString = longitudes.join(',');
    const dailyRain = 'daily_precipitation'; 
  
    return (`https://api.open-meteo.com/v1/forecast?latitude=${latitudeString}&longitude=${longitudeString}&current=relative_humidity_2m&timezone=America%2FNew_York&daily=${dailyRain}`);
  }
  
  
  function fetchWeatherData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = ''; 
  
        
        for (const locationData of data) {
          const stateName = getLocationName(locationData); 
          const humidity = locationData.current.relative_humidity_2m;
          const dailyRain = locationData.daily.precipitation; 
  
          
          weatherInfo.innerHTML += `
            <h3>${stateName} Weather</h3>
            <p>Humidity: ${humidity}%</p>
            <p>Daily Rain: ${dailyRain} mm</p><hr>`;
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        weatherInfo.textContent = 'Error fetching weather data.';
      });
  }
  
  function populateStateSelect() {
    const stateSelect = document.getElementById('state-select');
    for (const stateName in states) {
      const option = document.createElement('option');
      option.value = stateName;
      option.textContent = stateName;
      stateSelect.appendChild(option);
    }
  }
  
    populateStateSelect();
  
    const stateSelect = document.getElementById('state-select');
  stateSelect.addEventListener('change', () => {
    const selectedState = stateSelect.value;
    fetchWeatherData(buildWeatherUrl([selectedState])); 
  });




    
 
  
 
  
  