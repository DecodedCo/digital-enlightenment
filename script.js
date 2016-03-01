// What time is it?
var now = new Date;

// Check the current time as 24 hour clock e.g. 18 hours = 6pm
if (now.getHours() > 18) {
  price = "25.99"; // evening surcharge price
} else {
  price = "12.99"; // daytime price
}

// Display the current price on the page
$("p#price").html("Buy this product for $" + price);
