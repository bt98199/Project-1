$(document).ready(function()
{

    var i, x,y,z,xTime="";
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
            var t = data.currently.time*1000
            var time = moment(t).format("LT");
            $("#currentTime").html(time);
          $("#currentTemp").html(data.currently.temperature + "° F");
          $("#currentSummary").html(data.minutely.summary);
          //$("img").attr("src","data.minutely.icon");
          
          

          for (i in data.hourly.data) {
            x = data.hourly.data[i].time *1000;
            //xHour = moment(x).format("hh:mm")
            xTime = moment(x).format("LT");
            y = data.hourly.data[i].temperature ;
            z= data.hourly.data[i].summary ;

            var newrow = $("<tr>");
            newrow.append($("<td>" + xTime + "</td>"));
            newrow.append($("<td>" + y + "</td>"));
            newrow.append($("<td>" + z + "</td>"));
          
        //   $("#hourly").html(x);
        $("#hourly-table-rows").append(newrow);
          }
        }
      );
    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  
    location.innerHTML = "Locating...";
  }
  
  

});