//jquery for article scrape button
$('#button').click(function() {
    
    //event.preventDefault();

// Grab all articles on /articles route as a json object
$.getJSON("/articles", function(data) {
    // loop through each one and for each object
    for (var i = 0; i < data.length; i++) {
      // append to the articles div and display on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  
// ajax call for the Article
$.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })  

  // With that done, add the note information to the page
  .then(function(data) {
    console.log(data);
    // The title of the article
    $("#notes").append("<h2>" + data.title + "</h2>");

  });

})