// Dependencies
// =============================================================

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3300;

//sets up the express app to handle data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Customers (DATA)
// =============================================================
// * Create a few array variables that will hold the data

var reservations = [
{
customerName: "Jane",
phoneNumber: "555-1212",
customerEmail: "jane@gmail.com",
customerID: 3
}
];

var waitlist = [
  {
    customerName: "Alex",
    phoneNumber: "555-1234",
    customerEmail: "alex@gmail.com",
    customerID: 2
  }
];

// Routes
// =============================================================
// * Create a set of routes for getting and posting table data
// * Create a set of routes for displaying the HTML pages

// Basic route that sends the user first to the AJAX Page

  
  // Displays all reservation (tables)

app.get("/tables", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});



app.get("*", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "view.html"));
});
  
  // Displays a single character, or returns false

  // if (reservations.length <= 5) {
  //   app.post('/api/tables', function(req,res) {
  //     var newreservation = req.body;
  //     reservations.push(newreservation)
  //   })
  // }


app.post("/api/tables", function(req, res) {
  var newreservation = req.body;
  console.log(newreservation);
  if (reservations.length >= 5) {
    waitlist.push(newreservation);
  } else {
    reservations.push(newreservation);
  }
    res.json(newreservation);
});

app.post('/api/clear', function(req,res) {
  reservations = [];
  var idx = 0;
  while (waitlist.length > 0) {
    console.log(reservations, waitlist)
    reservations[idx] = waitlist.shift();
    idx++;
  }
})


  // Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });