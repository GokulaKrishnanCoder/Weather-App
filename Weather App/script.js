const apiKey = "962f9d877f86e2c481777f7c4351cfb5"; 
document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("result").innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p> Temperature: ${data.main.temp} °C</p>
        <p> Humidity: ${data.main.humidity}%</p>
        <p> Weather: ${data.weather[0].description}</p>`;
        let condition = data.weather[0].main;
        updatebg(condition);

    })
    .catch((error) => {
      document.getElementById("result").innerHTML = `<p>${error.message}</p>`;
    });
}
function updatebg(condition){
    console.log(condition);
    let body = document.body;
    let imageUrl = "";
     switch (condition) {
       case "Clear":
         imageUrl = "images/clear.jpg";
         break;
       case "Clouds":
         imageUrl = "images/cloud.jpg";
            break;
       case "Rain":
       case "Drizzle":
         imageUrl ="images/rainy.jpg";
         break;
       case "Thunderstorm":
         imageUrl =   "images/thunderstorm.jpg";
         break;
       case "Snow":
         imageUrl =
           "images/snow.jpg";
         break;
       case "Mist":
       case "Haze":
       case "Fog":
         imageUrl =
           "images/mist.jpg";
         break;
       default:
         imageUrl =
           "images/default.jpg";
         break;
     }
     body.style.backgroundImage = `url('${imageUrl}')`;
     body.style.backgroundSize = "cover";
     body.style.backgroundRepeat = "no-repeat";
     body.style.backgroundPosition = "center";
}
