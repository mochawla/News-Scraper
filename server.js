var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request")
var path = require("path");

//require folders so server can access them
var db = require("./models");
require("./controllers/controller.js");

var PORT = process.env.PORT || 3001;

// Initialize Express
var app = express();

// use bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// handlebars public folder static files (css, images etc.)
app.use(express.static('public'));

//handlebars configuration
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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