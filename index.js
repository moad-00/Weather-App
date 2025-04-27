const apiKey = "c24c63dc10b7ee4319f7a85e2987ebfe";
const API_URL = "http://api.weatherstack.com/current";

let weatherButton = document.getElementById("weather-button");
let temperatureField = document.getElementById("temperature");
let weatherDescriptionField = document.getElementById("weather-description");
let feelsLikeField = document.getElementById("feelslike");
let humidityField = document.getElementById("humidity");
let windSpeedField = document.getElementById("windspeed");
let sunRiseField = document.getElementById("sunrise");
let sunSetField = document.getElementById("sunset");
let isDayField = document.getElementById("isday");

let city;
let imageURL;

weatherButton.addEventListener('click', function() {
    city = document.getElementById("city").value.trim();
    sendAPIRequest();
});

const texts = document.getElementsByClassName('text');

for (let i=0;i < 6;i++) {
    texts[i].textContent = '-';
}

temperatureField.textContent = "-";
weatherDescriptionField.textContent = "-";

async function sendAPIRequest() {
      if (city === "") {
         document.getElementById("error-message").textContent = "Error: Please enter your City's name";
         return; 
        }
      try {
        const response = await fetch(API_URL + `?access_key=${apiKey}&query=${city}`);
        const data = await response.json()
        const temperature = JSON.stringify(data["current"]["temperature"]);
        temperatureField.textContent = temperature;
        const weatherDescription = JSON.stringify(data["current"]["weather_descriptions"][0]);
        weatherDescriptionField.textContent = weatherDescription.replace(/["']+/g, '');
        const feelsLike = JSON.stringify(data["current"]["feelslike"]);
        feelsLikeField.textContent = feelsLike.replace(/["']+/g, '');
        const humidity = JSON.stringify(data["current"]["humidity"]);
        humidityField.textContent = humidity.replace(/["']+/g, '');
        const windSpeed = JSON.stringify(data["current"]["wind_speed"]);
        windSpeedField.textContent = windSpeed.replace(/["']+/g, '');
        const sunRise = JSON.stringify(data["current"]["astro"]["sunrise"]);
        sunRiseField.textContent = sunRise.replace(/["']+/g, '');
        const sunSet = JSON.stringify(data["current"]["astro"]["sunset"]);
        sunSetField.textContent = sunSet.replace(/["']+/g, '');
        const isDay = JSON.stringify(data["current"]["is_day"]);
        isDayField.textContent = isDay.replace(/["']+/g, '');
        console.log("Weather Description: ", weatherDescription.replace(/["']+/g, ''));
        changeBackgrounds(weatherDescription.replace(/["']+/g, ''));
        
      }
      catch (error) {
        console.log(error);
      }
}

function changeBackgrounds(weather_description) {
  weather_description = weather_description.toLowerCase();
  switch (weather_description) {
      case "clear":
      case "sunny":
          document.body.style.backgroundImage = "url('./images/sunny.jpeg')";
          break;
      case "cloudy":
      case "overcast":
      case "partly cloudy":
      case "mostly cloudy":
          document.body.style.backgroundImage = "url('./images/cloudy.jpeg')";
          break;
      case "rain":
      case "light rain":
      case "moderate rain":
      case "heavy rain":
      case "very heavy rain":
          document.body.style.backgroundImage = "url('./images/rainy.jpeg')";
          break;
      case "snow":
      case "light snow":
      case "moderate snow":
      case "heavy snow":
          document.body.style.backgroundImage = "url('./images/snowy.jpeg')";
          break;
      case "thunderstorm":
      case "thunderstorm with light rain":
      case "thunderstorm with rain":
          document.body.style.backgroundImage = "url('./images/thunderstorm.jpeg')";
          break;
      case "fog":
      case "mist":
      case "haze":
          document.body.style.backgroundImage = "url('./images/foggy.jpeg')";
          break;
      case "tornado":
          document.body.style.backgroundImage = "url('./images/tornado.jpeg')";
          break;
      case "windy":
          document.body.style.backgroundImage = "url('./images/windy.jpeg')";
          break;
      default:
          document.body.style.backgroundImage = "url('./images/main.avif')";
          break;
  }
}
