$(document).ready(function()
{

    weather();

function weather() {
    var location = document.getElementById("location");
    var apiKey = "636ebb1e9d5667a5010df4ff3b04b9ad";
    var url = "https://api.darksky.net/forecast/";
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      location.innerHTML =
        "Latitude is " + latitude + "° Longitude is " + longitude + "°";
  
      $.getJSON(
        url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
        function(data) {
          $("#temp").html(data.currently.temperature + "° F");
          $("#minutely").html(data.minutely.summary);
          $("img").attr("src","data.minutely.icon");
          $("#hourly").html(data.hourly.data);
          console.log(data.hourly.data)
        }
      );
    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  
    location.innerHTML = "Locating...";
  }
  
  

});