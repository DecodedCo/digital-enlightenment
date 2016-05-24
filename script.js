// Hide the form using jQuery ($)
$('form').hide();

// Update the paragraph with an id of message
$('p#message').html("Please enable geolocation");

// Watch the user's location
watchUser = navigator.geolocation.watchPosition(foundYou);

// Our function to pass to watchPosition when it finds user
function foundYou(yourPosition){

  // What is "yourPosition"? *hint* press CMD+Alt+J to look in the console...
  console.log(yourPosition);

  // Store target location
  var targetLat = 40.7056748;
  var targetLon = -74.2581896;

  // Store user's location
  var userLat = yourPosition.coords.latitude;
  var userLon = yourPosition.coords.longitude;

  var distance = getDistanceFromLatLonInMiles(userLat,userLon,targetLat,targetLon);

  // Test distance
  console.log(distance);

  // Create threashold for checkin
  var geofence = 0.4; // in miles

  // LOGIC!
  if (distance < geofence){
    $('form').show();
    $('p#message').html("Congratulations, you made it.");
  } else {
    $('form').hide();
    $('p#message').html("Nearly here... You are only " + distance.toFixed(1) + " miles away");
  }

} // END foundYou

// Code snippet found here: http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points

function getDistanceFromLatLonInMiles(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d*(5/8); // Convert to miles
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// 1. When someone submits the form:
jQuery("form").submit(function() {
  // 2. Perform an AJAX request ($ is a shortcut for jQuery):
  $.ajax({
    // 3. Where to send data: use the URL from the form's action attribute
    url: $('form').attr('action'),
    // 4. What data to send: send the username specified in form input
    data: { username: $('input').val() },
    // 5. What to do if data submits successfully:
    success: function(result){
      // 6. Change the paragraph with an id 'message' to display a welcome message
      $('p#message').html('Hello there ' + result.username + '! Number of checkins: ' + result.checkIns);
      // 7. Hide the form now the user has checked in
      $('form').hide();
      // 8. Once they have checked in, stop watching their position
      if (typeof watchUser != 'undefined')
        navigator.geolocation.clearWatch(watchUser);
    } // END success
  }); // END ajax
  // 9. Allow form to submit without reloading the page
  event.preventDefault();
}) // END submit
