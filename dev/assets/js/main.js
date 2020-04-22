import inView from 'in-view';
import { generateJokes } from './modules/jokes';
import { generateWeatherElement } from './modules/weatherElement';
import { generateBundesligaTable } from './modules/bundesligaTable';
import $ from 'jquery';

((jQuery) => {
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  console.log(jQuery('#js-btn-open-weather').width());

  const DOM = {
    btnOpenWeather: $('#js-btn-open-weather'),
    weatherContainer: $('.weather-container')
  };

  const init = () => {
    window.onload = loadJokes;
    DOM.btnOpenWeather.addEventListener('click', onOpenWeatherClick);

    //  https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/

    // https://camwiegert.github.io/in-view/
    inView('.section-bundesliga').once('enter', onBundesligaInView);
  };

  const loadJokes = () => {
    fetch(`http://api.icndb.com/jokes/random/3`)
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj);
        generateJokes(obj);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onBundesligaInView = (el) => {
    console.log('in view', el);
    getBundesLigaResults();
  };

  const getBundesLigaResults = () => {
    fetch('https://www.openligadb.de/api/getmatchdata/bl1', {
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj);
        generateBundesligaTable(obj);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getWeatherByCoordinates = (geoInfoObj) => {
    const { latitude, longitude } = geoInfoObj.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=de&appid=07846f2117311f0350778b173e351426`
    )
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj);
        DOM.weatherContainer.appendChild(generateWeatherElement(obj));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getGeoInformation = () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
  };

  const onOpenWeatherClick = (event) => {
    getGeoInformation()
      .then((data) => {
        console.log(data);
        getWeatherByCoordinates(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  init();
})($);
