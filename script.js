// Initial array of Cities
var cities = [];
var apikey = "57f003f2a7e2dfb588d703bd2420d2c6";

// displayCityInfo function re-renders the HTML to display the appropriate content
function displayCityInfo() {
  var city = $(this).attr("data-name");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" +apikey + "&units=imperial";


  // Creating an AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    

    // Creating a div to hold the city
    var cityDiv = $("<div class='city'>");

    // Storing the location
    var area = response.name;

    // Creating an element to have the location displayed
    var pOne = $("<p>").text("City: " + area);

    // Displaying the location
    cityDiv.append(pOne);

    // Storing the Current Temp
    var temp = response.main.temp;

    // Creating an element to hold the Current Temp
    var pTwo = $("<p>").text("tempature: " + temp + "F");

    // Displaying the Current Temp
    cityDiv.append(pTwo);

    // Storing the Weather
    var weather = response.weather[0].description;

    // Creating an element to hold the plot
    var pThree = $("<p>").text("Weather: " + weather);

    // Appending the plot
    cityDiv.append(pThree);

    // Retrieving the URL for the image (not working)
    var imgURL = "http://openweathermap.org/img/w/10d.png";

    // Creating an element to hold the image
    var image = $("<png>").attr("src", imgURL);

    // Appending the image
    cityDiv.append(image);

    // Putting the entire city above the previous cities
    $("#cities-view").html(cityDiv);
  });

}

// Function for displaying city data
function renderButtons() {

  // Deleting the cities prior to adding new cities
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of cities
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generating buttons for each city in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of city-btn to our button
    a.addClass("city-btn");
    // Adding a data-attribute
    a.attr("data-name", cities[i]);
    // Providing the initial button text
    a.text(cities[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a city button is clicked
$("#add-city").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var city = $("#city-input").val().trim();

  // Adding city the textbox to our array
  cities.push(city);

  // Calling renderButtons which handles the processing of our city array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "city-btn"
$(document).on("click", ".city-btn", displayCityInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();