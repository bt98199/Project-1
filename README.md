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
Project 1: PROPOSAL

## Project Title:  Find closest Jump bikes and explore

Team Members: Bronson Turnquist, Leif Aesoph , Arpana George, Ruili Gao

Project Description: Our app will start with user’s current position and make API calls to gather useful/cool information and display it in an easily consumable UI.

APIs:
Google Maps, Jump Bike API, Weather forecast API

Sketch/Mockup:

Splash page for now is an intro of the app, then you click a button to get to the main functionality

# Minimum Viable Product

User launches the app and views current location in google maps, proximate Jump bike locations, and radius of walking distance they are willing to consider to get to closest bike
User is able to adjust viable walking radius
Application validates that the entry is:
A number (show error message)
Not larger than 10 kilometers (show error message)
Bike icons are color coded 
Strong charge batteries are green
Weak charge batteries are red
User can click each Jump bike icon and view the following information
Bike Name
Bike ID
Battery Charge
User clicks the “Weather” button and is taken to the weather forecast page

# Requirements
Two APIs:  Jump bike JSON and Google Maps API
Use Ajax: Jump biike JSON
New Library: Animation CSS for selected areas
Good front end UI: Splash page is nice, map page is a bit more “IT for IT”
Good quality coding standards:  We tried to
No alerts, confirms, or prompts:  Error messages are rendered to the DIV section
Use a repeating element (such as a table): The weather forecast is a table built off results from the Weather Forexast API
Use Bootstrap or similar: We used bootstrap
Must be deployed: https://bt98199.github.io/Project-1/
Must have user input validation:  User entry of meters of desired walking radius is validated.


*With thanks to http://suzeshardlow.com/boris_bikes/ for the framework of a cool, high performing map
