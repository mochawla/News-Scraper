var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios")
var path = require("path");
var logger = require("morgan");

//require models folder so server has access 
var db = require("./models");


var PORT = process.env.PORT || 3001;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

// use bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// handlebars public folder static files (css, images etc.)
app.use(express.static('public'));

//handlebars configuration
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require controllers folder so server has access
require("./controllers/controller.js")(app);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Show mongoose connection errors if any
mongoose.connection.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });
  
// show successful connection to mongoose
mongoose.connection.once("open", function() {
    console.log("Connected to Mongoose.");
  });

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });