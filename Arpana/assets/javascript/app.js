$(document).ready(function()
{

  var i, x,y,z,iconText,xTime, namedClass="=", idNumber=0;
  $(".jumbotron").hide();
  $(".hourly").hide();
  //Calling weather()
  weather();

  //Function containing all the code for getting weather forecast page
  function weather() {
    var location = document.getElementById("location");
    var apiKey = "636ebb1e9d5667a5010df4ff3b04b9ad";
    var url = "https://api.darksky.net/forecast/";
    //Using googleAPI, accessing current location
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      $(".jumbotron").show();
      $(".hourly").show();
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      // location.innerHTML =
      // "Latitude is " + latitude + "° Longitude is " + longitude + "°";

      //AJAX call for accessing DarkSky API
      $.getJSON(
        url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
        function(data) {
          var date = new Date();
          $("#currentDate").html(date.toDateString());
          var t = data.currently.time*1000
          var time = moment(t).format("LT");
          $("#currentTime").html(time);
          $("#currentTemp").html(data.currently.temperature + "° F");
          $("#currentSummary").html(data.currently.icon);
          var currentIconText = data.currently.icon;
          var  currentIcon = generateIcon(currentIconText);
          currentIcon.addClass("m-2");
          // var space = $("<pre>");
          $("#currentSummary").append(currentIcon);
          // space.append(currentIcon);
          for (i in data.hourly.data) {
            //converting API returned msecs to secs
            x = data.hourly.data[i].time *1000;
            xTime = moment(x).format("LT");
            //getting API returned hourly temperature
            y = data.hourly.data[i].temperature ;
            //getting API returned hourly icon
            z= data.hourly.data[i].icon ;
            hourlyIconText = data.hourly.data[i].icon ;

            //craeting new table row and assigning data values - time, temp, info and icon
            var newrow = $("<tr>");
            $("<tr>").addClass("m-5");
            newrow.append($("<td>" + xTime + "</td>"));
            newrow.append($("<td>" + y +"° F"+ "</td>"));
            newrow.append($("<td>" + z + "</td>"));
            //console.log("summary"+z);
            //console.log("icon"+w);

            //Getting icon for hourly status
            var  hourlyIcon = generateIcon(hourlyIconText);
            newrow.append(hourlyIcon);
            $("i").addClass("animated infinite rollIn");
            // $("i").attr("class", newClassname);
            var classname = $("i").attr("class");
            $("#hourly-table-rows").append(newrow);
          }

          function generateIcon(iconText)
          {
           
            switch (iconText) {
              case "clear-day":
              namedClass= "fa-sun";
              break;

              case "clear-night":
              namedClass= "fa-moon";
              break;
            
              case "rain":
              namedClass= "fa-cloud-showers-heavy";
              break;

              case "sleet":
              namedClass= "fa-cloud-meatball";
              break;

              case "wind":
              namedClass= "fa-wind";
              break;

              case "fog":
              namedClass= "fa-smog";
              break;

              case  "cloudy":
              namedClass= "fa-cloud";
              break;

              case "partly-cloudy-day":
              namedClass= "fa-cloud-sun";
              break;

              case "partly-cloudy-night":
              namedClass= "fa-cloud-moon";
              break;

              default:
              namedClass= "fa-sun";
            }

            var newClassname = "fas"+" "+namedClass;
            console.log(newClassname);
            var newicon = $("<i>").addClass(newClassname);
            return newicon ;
          }
        }
      );
    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  
    // location.innerHTML = "Locating...";
  }
 
});