var APIKey = "9e0c22d6bb74b53c73796b906b056dde";

$(document).ready(function() {
  const date = moment().format(" MM/DD/YYYY");
  $(".date").text(date);
});

$("#searchCity").on("click", function(event) {
  event.preventDefault();
  addLI();
  const APIKey = "089100f1dce99fc69ca132b28b1e31ea";
  const city = $("#cityInput").val();
  const queryURLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

  // Main Weather Call
  $.ajax({
    url: queryURLWeather,
    method: "GET"
  }).then(function(response) {
    $(".city").text(`${response.name} Weather:`);
    $(".wind").text(`Wind Speed: ${response.wind.speed}`);
    $(".humidity").text(`Humidity: ${response.main.humidity}`);
    $(".temp").text(`Temperature (F) ${response.main.temp}`);

    // Icon Call
    const icon = response.weather[0].icon;
    const image1 = createWeatherIconElement(icon);
    $(".icon").html(image1);

    // UVI Call
    const lat = response.coord.lat;
    const lon = response.coord.lon;
    const queryURLUVI = `https://api.openweathermap.org/data/2.5/uvi?&appid=${APIKey}&lat=${lat}&lon=${lon}`;
    $.ajax({
      url: queryURLUVI,
      method: "GET"
    }).then(function(UVI) {
      $(".uv").text(`UVI Value: ${UVI.value}`);
    });

    // 5 Day Weather Forecast
    const queryURLFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
    $.ajax({
      url: queryURLFiveDay,
      method: "GET"
    }).then(function(fiveDay) {
      for (let i = 1; i <= 5; i++) {
        updateFiveDayForecast(fiveDay.list[i], i);
      }
    });
  });
});

$("#list").on("click", "li", function() {
  const city1 = $(this).text();
  const APIKey = "089100f1dce99fc69ca132b28b1e31ea";
  const queryURLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&units=imperial&appid=${APIKey}`;

  $.ajax({
    url: queryURLWeather,
    method: "GET"
  }).then(function(response) {
    $(".city").html(`${response.name} Weather Details---`);
    $(".wind").text(`Wind Speed: ${response.wind.speed}`);
    $(".humidity").text(`Humidity: ${response.main.humidity}`);
    $(".temp").text(`Temperature (F) ${response.main.temp}`);
    
    const icon = response.weather[0].icon;
    const image1 = createWeatherIconElement(icon);
    $(".icon").html(image1);

    const lat = response.coord.lat;
    const lon = response.coord.lon;
    const queryURLUVI = `https://api.openweathermap.org/data/2.5/uvi?&appid=${APIKey}&lat=${lat}&lon=${lon}`;
    $.ajax({
      url: queryURLUVI,
      method: "GET"
    }).then(function(UVI) {
      $(".uv").text(`UVI Value: ${UVI.value}`);
    });

    const queryURLFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city1}&units=imperial&appid=${APIKey}`;
    $.ajax({
      url: queryURLFiveDay,
      method: "GET"
    }).then(function(fiveDay) {
      for (let i = 1; i <= 5; i++) {
        updateFiveDayForecast(fiveDay.list[i], i);
      }
    });
  });
});

function addLI() {
  const txtVal = $("#cityInput").val();
  const liNode = document.createElement("li");
  liNode.setAttribute("class", "list-group-item");
  liNode.appendChild(document.createTextNode(txtVal));
  $("#list").append(liNode);
}

function createWeatherIconElement(icon) {
  const image = document.createElement("IMG");
  image.alt = "weather icon";
  image.setAttribute("class", "photo");
  image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return image;
}

function updateFiveDayForecast(data, index) {
  $(`.card-title${index}`).text(data.dt_txt);
  $(`.temp${index}`).text(`Temp ${data.main.temp} ºF`);
  $(`.humidity${index}`).text(`Humidity ${data.main.humidity}%`);
  const icon = data.weather[0].icon;
  const image = createWeatherIconElement(icon);
  $(`.icon${index}`).html(image);
}
