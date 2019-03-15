$(document).ready(function() {
 


  // $("button").on("click", function() {
    // var person = $(this).attr("data-person");
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //   person + "&api_key=dc6zaTOxFJmzC&limit=10";
    var queryURL= "https://data.kingcounty.gov/resource/j56h-zgnm.json";

    $.ajax({
      url: queryURL,
      method: "GET",
      data: {
          "$limit" : 500,
          "$$app_token" : "espxXkpZGfyr4LmWNhIiqFRVS"
        //   "$$app_token" : "hCKMUtUkHvoev-6qD98KdKJYovlET4c1ZZfR"
      }
    })
      .then(function(data) {
        var results = data;
        for (var i = 0; i < results.length; i++) {

          let bookId = results[i].book_of_arrest_number;
          let bookDate = moment(results[i].booking_date_time).format("ll");
          let bookFirst = results[i].first_name;
          let bookLast = results[i].last_name;
          let bookCharge = results[i].charge;
          let bookReleaseDate = moment(results[i].release_date_time).format("ll");
          let releaseReason = results[i].release_reason;
        //   let rcwCharge = results[i].rcw_ordinance_number;


           // Create the new row
         var newRow = $("<tr>").append(
           $("<td>").text(bookId),
           $("<td>").text(bookDate),
           $("<td>").text(bookFirst),
           $("<td>").text(bookLast),
           $("<td>").text(bookCharge),
           $("<td>").text(bookReleaseDate),
           $("<td>").text(releaseReason)
        //    $("<td>").text(rcwCharge)
        );

          $("#jump-bikes-view > tbody").prepend(newRow);
        }
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