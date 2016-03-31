// Tell user we are calculating uber time
jQuery("section").append("<p id='uber'>Calculating how long until an uber can arrive...</p>");

// Watch the user's location
watchUser = navigator.geolocation.watchPosition(foundYou);

// Our function to pass to watchPosition when it finds user
function foundYou(yourPosition){

  // What is "yourPosition"? *hint* press CMD+Alt+J to look in the console...
  console.log(yourPosition);

  // Store user's location
  var userLat = yourPosition.coords.latitude;
  var userLon = yourPosition.coords.longitude;

	//See how long it would take for an Uber to arrive
  // Uber API URL
  var apiUrl = "https://api.uber.com/v1/estimates/time?start_latitude="+userLat+"&start_longitude="+userLon;

  // Make an ajax request to the uber api
  $.ajax({
		url: apiUrl,
    // Authorization Token is required for requests to uber api
    // This token comes from https://developers.uber.com
		headers: {"Authorization": "Token VYkyBdIrlfBxksBZm22XtMWhhbZLTFxqbX1WiDNY"},
		success: printUberTime
	});
  
} // END foundYou

// Takes the response from the uber api and updates the paragraph with id="uber"
function printUberTime(response) {
  
  // log the api response to the console
  console.log(response);

  // Store the seconds till an uber arrives in a variable.
  // Value in [] is the type of uber: 0 = uberX, 1 = ...

	var timeInSeconds = response.times[0].estimate
  
  // Update the paragraph with an id of "uber" to show the time estimate
	jQuery('p#uber').html("Catch an <a href='uber://'>Uber</a> to join us, it will take " + timeInSeconds + " seconds to arrive");

}//END printUberTime