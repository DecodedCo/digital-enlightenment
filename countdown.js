// Set the date the reward is revealed
// Example below is for 4/1/16 at 6:30pm
var year = 2016;
var month = 04;
var day = 05;
var hours = 18;
var minutes = 30;

// Convert into a JavaScript Date object
var rewardDate = new Date(year, month-1, day, hours, minutes);

// Add live countdown to the element with id 'countdown'
jQuery('p#countdown').countdown(year + '/' + month + '/' + day+ ' ' + hours + ':' + minutes +':00',
	function(event) {
	    jQuery(this).text(event.strftime('Only %-D day%!D %H:%M:%S until your destination is revealed.'));
	});

/*

// Logic
var timeNow = Date.now();
var timeReward = rewardDate.getTime();

// If it is time
if ( ) {
	jQuery('section').append('<p>You are going to Secret Location.</p>');
	jQuery('p#countdown').hide();
} //End of if statement

*/
