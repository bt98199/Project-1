### Link to deployed project - https://bt98199.github.io/Project-1/

# Project-1
Team project for UW201902FT




## Weather Section
- Got current location of user -latitude and longitude using Geolocation
- By passing latitude and longitude as parameters for the AJAX call, got current weather forecast info from Dark Sky API
- Used bootstrap jumbotron to display current info - Date, Time, Temperature, Weather Status, weather icon
- Used bootstrap jumbotron to display hourly info - Time, Temperature, Weather Status, weather icon
    * used for in loop to access API info 
    * converted the time given by API in msecs to secs and used momentjs to display the time in desired format 
    * used font Awesome 5 to access the weather icons since it wasn't provided by the Dark Sky API
    * Gave animations to buttons and icons using CSS library animate.css

## Search 
- Map is hard coded to Seattle lat long coordinates 
- Users are able to perform a simple search using the Google Places API
- Search bar will auto-fill with predictions of what the users might be looking for utilizing the Google places library


*With thanks to http://suzeshardlow.com/boris_bikes/ for the framework of a cool, high performing map
