/* global google:ignore */

$(() => {
  function getData() {
    $.ajax({
      url: "https://sea.jumpbikes.com/opendata/free_bike_status.json",
      method: "GET"
    })
      .done(function(response) {
        var results = response.data.bikes;
        var datResults = response.last_updated;
        for (var i = 0; i < results.length; i++) {
          var bikeId = results[i].bike_id;
          var bikeName = results[i].name;
          var batteryLevel = results[i].jump_ebike_battery_level;
          var bikeLat = parseInt(100000*results[i].lat) / 100000;
          var bikeLong = parseInt(100000*results[i].lon) / 100000;
          addMarkers (bikeLat, bikeLong, bikeName,batteryLevel, bikeId);
        };
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
        url: "boris.png",
        scaledSize: new google.maps.Size(20,20)
      },
      title: bikeId,
      opacity: 0.7,
      stationDetails: {
        name: bikeName,
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
        '<h1 id="firstHeading" class="firstHeading">' + this.stationDetails.bikeName + '</h1>' +
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

  function drawCircle() {
    new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: map.center,
      radius: 1000
    });
  }

  function geolocateUser() {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        drawCircle();
      }
    );
  }

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

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(47.60918,-122.33424),
    styles: styleMap()
  });

  getData();
  geolocateUser();

});
