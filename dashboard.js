
/*

  Plot a Google Map with Live Traffic

  Requires in the <head>:

  <script src="https://maps.googleapis.com/maps/api/js?key=API_KEY">

  Requires this file referenced in the bottom of <body>:

  <script src="map.js"></script>

  Requires <div id="map"></div> where you want to place the map

*/

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 13,
  center: {lat: 32.774105, lng: -96.804247}
});

var trafficLayer = new google.maps.TrafficLayer();
trafficLayer.setMap(map);


/*

  Show Live Weather Data

  Requires jQuery in the <head>:

  <script src="//code.jquery.com/jquery-2.1.4.min.js"></script>

  Requires this file referenced in the bottom of <body>:

  <script src="weather.js"></script>

  Requires <div id="weather"></div> where you want to place the weather

*/

var url = '/weather/data/2.5/weather?units=imperial&APPID=eb0b0a65c39e86c2a2efdebd2fe090cc&q=Dallas';

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

/*

  Show Live Sensor Data

*/

var width = 600,
    height = 300;

var margin = {top: 20, right:20, bottom:20, left:50};

// draw and append the container
var svg = d3.select("#sensor").append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");

var xScale = d3.scale.linear()
      .range([0,width - margin.left - margin.right]);

var yScale = d3.scale.linear()
      .range([height - margin.top - margin.bottom,0]);

var line = d3.svg.line().interpolate("monotone")
  .x(function(d){ return xScale(d.x); })
  .y(function(d){ return yScale(d.y); });

function render(){
  // get new data
  //var data = newData();

  $.ajax({
    url: "https://labs.decoded.com/tech/sensor-api/", // Replace the URL here
    type: "GET",
    success: function(d){
      var data = d;
      var newData = [[]];
      ;

// Begin injected loop protection init
var __DECODED_TIMER_5y = Date.now();
var __DECODED_ITERATIONS_5y = 0;
// End injected loop protection init

for(i=0; i<data.length; i++){
        xpos = data[i].x/100;
        ypos = data[i].y;
        newData[0].push({x:xpos, y:ypos});;

// Begin injected loop protection
++__DECODED_ITERATIONS_5y;
if ((__DECODED_ITERATIONS_5y > 50) && (Date.now() - __DECODED_TIMER_5y > 100)) {
  if (confirm("Uh oh! Looks like you've got an infinite loop on line 33. Do you want to stop it?")) {
    break;
  } else {
    __DECODED_TIMER_5y = Date.now();
    __DECODED_ITERATIONS_5y = 0;
  }
};
// End injected loop protection

      }

      // obtain absolute min and max
      var yMin = newData.reduce(function(pv,cv){
        var currentMin = cv.reduce(function(pv,cv){
          return Math.min(pv,cv.y);
        },0)
        return Math.min(pv,currentMin);
      },0);
      var yMax = 100;

      // set domain for axis
      yScale.domain([yMin,yMax]);

      // create axis scale
      var yAxis = d3.svg.axis()
          .scale(yScale).orient("left");

      // if no axis exists, create one, otherwise update it
      if (svg.selectAll(".y.axis")[0].length < 1 ){
        svg.append("g")
            .attr("class","y axis")
            .call(yAxis);
      } else {
        svg.selectAll(".y.axis").transition().duration(200).call(yAxis);
      }

      // generate line paths
      var lines = svg.selectAll(".line").data(newData).attr("class","line");

      // transition from previous paths to new paths
      lines.transition().duration(10)
        .attr("d",line)
        .style("stroke", "black");

      // enter any new data
      lines.enter()
        .append("path")
        .attr("class","line")
        .attr("d",line)
        .style("stroke", "black");

      // exit
      lines.exit()
        .remove();

      } // end of ajax success function
    }); // end of ajax

} // end of render

// initial page render
//render("https://labs.decoded.com/tech/sensor-api/");
render();

// continuous page render
setInterval(render, 200);
