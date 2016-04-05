// Set the reward date and time
var year = 2016;
var month = 04;
var day = 05;
var hours = 18;
var minutes = 30;
// Example above is for April 5th, 2016 at 6:30pm

// Convert into a JavaScript Date object
var rewardDate = new Date(year, month-1, day, hours, minutes);

var timeNow = Date.now();
var timeReward = rewardDate.getTime();

// Logic - reveal the reward when it's time
if ( ) {
  // Display the location in the app, at the end of the section
  jQuery('section').append('<p>You are going to Location Name!</p>');
} else {
  // Use jQuery's countdown plugin to add live counter to the p element with id 'countdown'
  jQuery('p#countdown').countdown(year + '/' + month + '/' + day+ ' ' + hours + ':' + minutes +':00',
    function(event) {
      jQuery(this).text(event.strftime('Only %-D day%!D %H:%M:%S until your location is revealed...'));
    }
  );

} //End of if statement
