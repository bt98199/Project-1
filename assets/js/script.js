$(document).ready(function() {

  var showLoc = document.getElementById("current-location");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      showLoc.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    showLoc.innerHTML = "Your Lat: " + position.coords.latitude + 
    "<br>Your Long: " + position.coords.longitude;
  }
getLocation();

// Google map api init. Default is UW Continuing Ed but should get overwritten by user position later. For performance reasons we might try to just center on user position from the jump.
function initMap () {
  const home  = {lat: 47.60918, lng: -122.33424};
  const mapOptions = {
    zoom: 17,
    center: home,
    mapTypeId: "terrain"
  };
  const icon = {
    url: "./assets/images/bike2.png",
    scaledSize: new google.maps.Size(20,20),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,0),
    labelOrigin: new google.maps.Point(-5,-5),
  };

  const map = new google.maps.Map(document.getElementById('map-section'), mapOptions);
  const queryURL = "https://sea.jumpbikes.com/opendata/free_bike_status.json";

$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {
    var results = response.data.bikes;
    var datResults = response.last_updated;
    var bikeLayer = new google.maps.BicyclingLayer();
    var styles = {
      default: null,
      hide: [
        {
          featureType: 'poi.business',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{visibility: 'off'}]
        }
      ]
    };
    map.setOptions({styles: styles['hide']});
    bikeLayer.setMap(map);

    for (var i = 0; i < results.length; i++) {
      let bikeId = results[i].bike_id;
      let bikeName = results[i].name;
      // let isReserved = results[i].is_reserved;
      // let isDisabled = results[i].is_disabled;
      let batteryLevel = results[i].jump_ebike_battery_level;
      // let vehicleType = results[i].jump_vehicle_type;
      let bikeLat = parseInt(100000*results[i].lat) / 100000;
      let bikeLong = parseInt(100000*results[i].lon) / 100000;

      function addMarkers () {
        var markers = new google.maps.Marker({
          position: {lat: bikeLat, lng: bikeLong},
          map:map,
          icon:icon,
          title:bikeName,
          class: "limeMarker",
          label: {
            text: "Battery: " + batteryLevel,
            color: "#000000",
            fontSize: "16px",
            fontWeight: "bold",
            labelInBackground: false,
            labelClass: "labels",
  
          },
          });
      };
      addMarkers(results[i]);
      // console.log(results[i]);
    };
    $("#last-updated").append("  Last updated: " + moment(datResults*1000).format('LLL'));
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
      function clearMarkers() {
      $(".limeMarker").hide();
      
      };
      function showMarkers() {
      $(".limeMarker").show(); 
      };

      // Removes the markers from the map, but keeps them in the array. NOT WORKING
      $("#clear-markers").on("click", function() {
        clearMarkers();
      });
      
      // Shows any markers currently in the array.
      $("#show-markers").on("click", function() {
        showMarkers();
      });


  initMap();

});
