  // Add a button to your section
  jQuery('section').append('<p id="ifttt"><button>We\'re here!</button></p>');
  
  // When your button is clicked, activate your ifttt recipe
  // Replace TRIGGERNAME with your trigger
  $('button').click(function() {
    $.get('https://maker.ifttt.com/trigger/TRIGGERNAME/with/key/O0h3mC9aUQQ8wkXhenwDr');
  });
