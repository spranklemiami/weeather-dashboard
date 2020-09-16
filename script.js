$(document).ready(function () {
  var submitEl = $("#submit-button");
  var searchHistoryArray = JSON.parse(localStorage.getItem("search-history"))||[];
  var searchKeyWord = [];
  var searchInputEl = $("#search-input");
  var acceptedCharacters = "abcdefghijklmnopqrstuvwxyz, ".split("");
  var apiKey = "31452e44d256376a64ad98d95e80af09";
  var historyDiv = $("#search-history-div");
  historyDiv.attr("style", "padding-left: 5%;");
 

  submitEl.on("click", function (event) {
    event.preventDefault();

    var searchInput = $("#search-input").val();
    if (searchInput !== "") {
    searchCurrentWeather(searchInput);
    futureDates();
    }
    
  });

  
  function displayHistory () {
      historyDiv.html("")
      for (var i = 0; i < searchHistoryArray.length; i++) {
        var city = searchHistoryArray[i];
        var buttonEl = $("<button>");       
        buttonEl.attr("style", "width: 70%");
        buttonEl.addClass("searchHistoryButton");
        buttonEl.text(city);
        buttonEl.on("click", function (event) {
        searchCurrentWeather(event.target.innerText);
    
        }); 
        historyDiv.prepend(buttonEl);
      }
  }
  displayHistory();
  function searchCurrentWeather(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey;
    var currentCity = $("#current-city");

    if (!searchHistoryArray.includes(city)) {
        searchHistoryArray.push(city);
        localStorage.setItem("search-history", JSON.stringify(searchHistoryArray));
        displayHistory();
    }

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response.weather);
      currentCity.text(response.name);
      $("#temperature").text("Temperature: " + response.main.temp);
      $("#humidity").text("Humidity: " + response.main.humidity);
      $("#wind-speed").text("Wind speed: " + response.wind.speed);
      $("#uv-index").text("UV Index: " + response.uvi);
      uvIndex(response.coord.lat,response.coord.lon);
    });
  }

  function uvIndex (lat,long) {
    
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" +  apiKey;


    $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        $("#uv-index").text("UV Index: " + response.value);
       
      });
  }

});
