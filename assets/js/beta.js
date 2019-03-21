/* global google:ignore */

$(() => {
  // Shows the location to the user.  This is for testing and nice to know info and adds too much bloat to the code to be of use.  Will either find a way to just do this in HTML5 (should be easy enough) or comment out for deployment purposes========================
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
    "     ||     " + "Your Long: " + position.coords.longitude;
  }







  // =======================================================================
  
  function getData() {
    $.ajax({
      url: "https://sea.jumpbikes.com/opendata/free_bike_status.json",
      method: "GET"
    })
      .done(function(response) {
        var results = response.data.bikes;
        var lastUpdated = response.last_updated;
        for (var i = 0; i < results.length; i++) {
          var bikeId = results[i].bike_id;
          var bikeName = results[i].name;
          var batteryLevel = results[i].jump_ebike_battery_level;
          var bikeLat = parseInt(100000*results[i].lat) / 100000;
          var bikeLong = parseInt(100000*results[i].lon) / 100000;
          addMarkers (bikeLat, bikeLong, bikeName,batteryLevel, bikeId);
        };
      $("#last-updated").append("  Last updated: " + moment(lastUpdated*1000).format('LLL'));
      }); 
    }



  function addMarkers(bikeLat, bikeLong, bikeName,batteryLevel, bikeId) {
    const location = {
      lat: bikeLat,
      lng: bikeLong
    };

    const marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: {
        url: (parseInt(batteryLevel) >=50) ? "./assets/images/bike1.png":"./assets/images/bike2.png",
        scaledSize: new google.maps.Size(20,20)
      },
      opacity: 0.7,
      stationDetails: {
        bikeName: bikeName,
        batteryLevel: batteryLevel,
        bikeId: bikeId
      }
    });
    

    marker.addListener('click', function() {
      const infowindow = new google.maps.InfoWindow({
        content: '' +
        '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<p id="firstHeading" class="firstHeading"> Bike Number: ' + this.stationDetails.bikeName + '</p>' +
        '<div id="bodyContent">' +
        '<ul>' +
        '<li>Battery Level: ' + this.stationDetails.batteryLevel + '</li>' +
        '<li>Bike ID: ' + this.stationDetails.bikeId + '</li>' +
        '</ul>' +
        '</div>' +
        '</div>'
      });

      infowindow.open(map, this);
    });
  }

  //  ==========Draw a "How far I'm willing to walk." Radius in meters (those frogs)========
  // let walkRadius = 400;
  // function drawCircle(radius) {
  //   var walkCircle = new google.maps.Circle({
  //     strokeColor: '#d5d39a',
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: 'orange',
  //     fillOpacity: 0.25,
  //     map: map,
  //     center: map.center,
  //     radius: radius
  //   });
  // }

  var userRadius = 400;

 
  




  function geolocateUser() {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        marker = new google.maps.Marker({
          position:{
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          map: map,
          icon: "./assets/images/VpVF8.png"
        })
       })
  };
  function initCircle() {
    navigator.geolocation.getCurrentPosition(
      function(position) {     
        googCircle = new google.maps.Circle({
          strokeColor: '#d5d39a',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'orange',
          fillOpacity: 0.25,
          map: map,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          radius: userRadius
        });
        googCircle.setMap(map);
      })
    };


      

// =======================Adds the bike paths================================================
function getBikeLayer() {
  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map)
};
//  ==========Setting google approved style parameter modifications======
  function styleMap() {
    return([
      {
        'featureType': 'administrative',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#444444'
          }
        ]
      },
      {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#f2f2f2'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'all',
        'stylers': [
          {
            'saturation': -100
          },
          {
            'lightness': 45
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'simplified'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#77738c'
          },
          {
            'visibility': 'on'
          }
        ]
      }
    ]);
  }

  const map = new google.maps.Map(document.getElementById("map-section"), {
    zoom: 16,
    center: new google.maps.LatLng(47.60918,-122.33424),
    mapTypeId: "terrain",
    styles: styleMap(),
  });




  function drawCircle() {
    googCircle.setMap(null)
    console.log("New User Radius: " + userRadius);
    initCircle();
  }


  function clearMarkers() {
    $(".limeMarker").hide();
    
    };
  function showMarkers() {
    $(".limeMarker").show(); 
    };
  
  function showMarkers() {
    $(".limeMarker").show(); 
    };
   
    $("#radius-input").on("click", function() {
      event.preventDefault();
      console.log("old radius: "+ userRadius);
      userRadius = parseInt($("#walk-radius").val().trim());
      drawCircle();
    });




  // Removes the markers from the map, but keeps them in the array. NOT WORKING
  $("#clear-markers").on("click", function() {
      clearMarkers();
    });
    
  // Shows any markers currently in the array.
  $("#show-markers").on("click", function() {
      showMarkers();
    });

  // Shows any markers currently in the array.
  $("#show-weather").on("click", function() {
    $('.weather-section').append("<p> Weather info goes here!!</p>");
  });







  getLocation();
  getData();
  geolocateUser();
  initCircle();
  getBikeLayer();

});
