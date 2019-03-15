$(document).ready(function() {
 


  // $("button").on("click", function() {
    // var person = $(this).attr("data-person");
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //   person + "&api_key=dc6zaTOxFJmzC&limit=10";
    var queryURL= "https://sea.jumpbikes.com/opendata/free_bike_status.json";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data.bikes;
        var datResults = response.last_updated;
        
        for (var i = 0; i < results.length; i++) {

          // let lastUpdate = results[i].last_updated;
          // let lastUpdate = datResults;
          let bikeId = results[i].bike_id;
          let bikeName = results[i].name;
          let isReserved = results[i].is_reserved;
          let isDisabled = results[i].ios_reserved;
          let batteryLevel = results[i].jump_ebike_battery_level;
          let vehicleType = results[i].jump_vehicle_type;
          let bikeLat = parseInt(1000*results[i].lat) / 1000;
          let bikeLong = parseInt(1000*results[i].lon) / 1000;

           // Create the new row
         var newRow = $("<tr>").append(
          //  $("<td>").text(lastUpdate),
           $("<td>").text(bikeId),
           $("<td>").text(bikeName),
           $("<td>").text(isReserved),
           $("<td>").text(isDisabled),
           $("<td>").text(batteryLevel),
           $("<td>").text(vehicleType),
           $("<td>").text(bikeLat),
           $("<td>").text(bikeLong)
        );

          $("#jump-bikes-view > tbody").append(newRow);
        }
          $("#card-h").append("  Last updated: " + moment(datResults*1000).format('LLL'));
      });







  // });



 
  
  function clear() {
    $("#jump-bikes-view > tbody").empty();
  };

  $("#clear-all").on("click", clear);

  // $("#clear-all").on("click",function () {
  //   $("#jump-bikes-view > tbody").empty();
  // });
 
});