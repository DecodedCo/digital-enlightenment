/*

  Plot a Google Map with Live Traffic

  Requires in the <head>:

  <script src="https://maps.googleapis.com/maps/api/js?key=API_KEY"></script>

  Requires this file referenced in the bottom of <body>:

  <script src="map.js"></script>

  Requires <div id="map"></div> where you want to place the map, with a height specified in the CSS file

*/

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 13,
  center: {lat: 34.04924594193164, lng: -118.24104309082031}
});

var trafficLayer = new google.maps.TrafficLayer();
trafficLayer.setMap(map);
