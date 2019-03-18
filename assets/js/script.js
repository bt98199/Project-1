$(document).ready(function() {

  var x = document.getElementById("current-location");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
  }
getLocation();

// Google map api init. Default is UW Continuing Ed but should get overwritten by user position later. For performance reasons we might try to just center on user position from the jump.
function initMap () {
  const home  = {lat: 47.609189, lng: -122.334249};
  const mapOptions = {
    zoom: 17,
    center: x,
  }
  const icon = {
    url: "./assets/images/bike2.png",
    scaledSize: new google.maps.Size(40,40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0,0),
    labelOrigin: new google.maps.Point(-5,-15),
  };

  const map = new google.maps.Map(document.getElementById('trafficSection'), mapOptions);
  const queryURL = "https://sea.jumpbikes.com/opendata/free_bike_status.json";

$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {
    var results = response.data.bikes;
    var datResults = response.last_updated;
    
    for (var i = 0; i < results.length; i++) {
      let bikeId = results[i].bike_id;
      let bikeName = results[i].name;
      // let isReserved = results[i].is_reserved;
      // let isDisabled = results[i].ios_reserved;
      let batteryLevel = results[i].jump_ebike_battery_level;
      // let vehicleType = results[i].jump_vehicle_type;
      let bikeLat = parseInt(100000*results[i].lat) / 100000;
      let bikeLong = parseInt(100000*results[i].lon) / 100000;

      function addMarker () {
        var marker = new google.maps.Marker({
          position: {lat: bikeLat, lng: bikeLong},
          map:map,
          icon:icon,
          title:bikeName,
          // label: "Battery: " + batteryLevel,
          label: {
            text: "Battery: " + batteryLevel,
            color: "#b1599f",
            fontSize: "16px",
            fontWeight: "bold",
            labelInBackground: false,
            labelClass: "labels",
  
          },
          });
      };

      addMarker(results[i]);
      console.log(results[i]);
      console.log(batteryLevel);
    };
  });

      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
           const user_location = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };

           // Center map with user location
           map.setCenter(user_location);

           // Add a marker for your user location
           var userLocation = new google.maps.Marker({
             position: {
               lat: user_location.lat,
               lng: user_location.lng
             },
             map: map,
             title: "You are here"
           });

     }, function () {
       console.log('Error in the geolocation service.');
     });
     } else {
      console.log('Browser does not support geolocation.');
     }

     }
  initMap();
});
