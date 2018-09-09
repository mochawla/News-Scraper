var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request")
var path = require("path");

module.exports = function (app) {
 
//a get route that will load handlebars homepage

//a get route that will scrape for articles from a website (includes query to database to get all articles) 

//a get route for viewing articles that have been scraped (could do it on homepage instead)

//a post route that will save an article (will update the saved boolean in the db from false to true based on id)

//a get route that will save get and display articles that the user saved

//a post route that will delete an article from saved based on it's id (change from saved to unsaved)

//a get route that will grab an article by it's id and populate it with it's note

//a post route that will create a note

//a route that will delete a note by id













}