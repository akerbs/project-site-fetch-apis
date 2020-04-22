const generateWeatherElement = (obj) => {
  const icon = obj.weather[0].icon;
  const description =
    obj.weather[0].description === '' ? 'n/a' : obj.weather[0].description;
  const title = obj.weather[0].main;
  const { temp, temp_min: tempMin, temp_max: tempMax } = obj.main;

  const weatherEl = document.createElement('div');
  const weatherImage = document.createElement('div');
  const imgEl = document.createElement('img'); // icon
  const weatherInformation = document.createElement('div');
  const weatherDescription = document.createElement('p'); // description
  const weatherTemperature = document.createElement('span'); // temp
  const weatherTempRange = document.createElement('span'); // temp_min - temp_max

  weatherEl.classList.add('m-weather');
  weatherImage.classList.add('weather-image');
  weatherInformation.classList.add('weather-information');
  weatherDescription.classList.add('weather-description'); // description
  weatherTemperature.classList.add('weather-temperature'); // temp
  weatherTempRange.classList.add('weather-temp-range'); // temp_min - temp_max

  weatherEl.appendChild(weatherImage);
  weatherImage.appendChild(imgEl);

  weatherEl.appendChild(weatherInformation);
  weatherInformation.appendChild(weatherTemperature);
  weatherInformation.appendChild(weatherTempRange);
  weatherInformation.appendChild(weatherDescription);

  console.log(`Object.weather`, obj.weather);
  console.log(`Object.main:`, obj.main);

  imgEl.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherTemperature.textContent = `${Math.round(temp)} °C`;
  weatherTempRange.textContent = `${Math.round(tempMin)} - ${Math.round(
    tempMax
  )} °C`; // TODO: unit C | F als Variable
  weatherDescription.textContent = description;

  return weatherEl;
};

module.exports = {
  generateWeatherElement
};
