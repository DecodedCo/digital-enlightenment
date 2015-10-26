/*

  Show Live Weather Data

  Requires jQuery in the <head>:

  <script src="//code.jquery.com/jquery-2.1.4.min.js"></script>

  Requires this file referenced in the bottom of <body>:

  <script src="weather.js"></script>

  Requires <div id="weather"></div> where you want to place the weather

*/

var url = '//api.openweathermap.org/data/2.5/weather?units=imperial&APPID=API_KEY&q=Los+Angeles';

jQuery.getJSON(url)
  .done( function (data) {
  jQuery('#weather').html('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">' +
    '<p>' + data.main.temp + ' F</p>' +
    '<p><label>Max:</label> ' + data.main.temp_max + ' F</p>' +
    '<p><label>Min:</label> ' + data.main.temp_min + ' F</p>' +
    '<p><label>Humidity:</label> ' + data.main.humidity + '%</p>' +
    '<p><label>Wind Speed:</label> ' + data.wind.speed + ' mph</p>' +
    '<p><label>Visibility:</label> ' + data.main.pressure + ' mb</p>');
});
