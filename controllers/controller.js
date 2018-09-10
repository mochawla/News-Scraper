var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios")
var path = require("path");
var logger = require("morgan");

var db = require("../models");

module.exports = function (app) {
 
//a get route that will load handlebars homepage
app.get("/", function(req, res) {
    res.send("This will be the homepage");
  });

//a get route that will scrape for articles from a website (includes query to database to get all articles)*
    app.get("/scrape", function(req, res){
        
        axios.get("https://news.ycombinator.com/").then(function(response){

        // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
            //console.log(response.data)
            // Now, we grab every h2 within an article tag, and do the following:
            $(".title").each(function(i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                .children("a")
                .text();
                result.link = $(this)
                .children("a")
                .attr("href");
                // result.summary = $(this)
                // .children(".summary")
                // .text();
                //console.log(result)
                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                });
                // .catch(function(err) {
                // // If an error occurred, send it to the client
                // return res.json(err);
                // });

            });
            
            // If we were able to successfully scrape and save an Article, send a message to the client
            res.redirect('/articles')

        })

    });


//a get route for viewing articles that have been scraped/getting them from the db*
    app.get("/articles", function(req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
        .then(function(dbArticle) {
    // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
    })
    .catch(function(err) {
    // If an error occurred, send it to the client
        res.json(err);
    });
})

//a post route that will save an article (will update the saved boolean in the db from false to true based on id)

//a get route that will save get and display articles that the user saved

//a post route that will delete an article from saved based on it's id (change from saved to unsaved)

//a get route that will grab an article by it's id and populate it with it's note*

//a post route that will create/save/update an articles note*

//a route that will delete a note by id

}