//Add a button to your section
jQuery("section").append("<button>We're here!</button>");

// When your button is clicked, do your ifttt recipe.
$("button").click(function() {
       $.get("https://maker.ifttt.com/trigger/Hue/with/key/c61OpeRCP2Akr6yD9YqSF2");
           $.get("https://maker.ifttt.com/trigger/sophie_test_4/with/key/c61OpeRCP2Akr6yD9YqSF2");
});