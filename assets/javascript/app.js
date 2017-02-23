//Giphy search using API
var movieTitle = "";


    
var movieArray = ["Titanic", "Beverly Hills Cop", "The Princess Bride", "The Lord of the Rings", "Monty Python and the Holy Grail", "Star Wars", "Do the Right Thing"];
 



function displayGiff() {

       var title = $(this).attr('data-name');
       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=dc6zaTOxFJmzC&limit=12";
$.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    
      for (i=0; i < 12; i++) {
      	//Generate the images with the links for moving and still images embeded
        $("#display"+ i).html("<img src='" + response.data[i].images.fixed_height_still.url + "'" +
        						"data-animated='"+	response.data[i].images.fixed_height.url + "'" +
        						"data-still='" +	response.data[i].images.fixed_height_still.url + "'" +
        						"data='still' class='image'>");
        // put ratings in upper case letters
        var y = response.data[i].rating.toUpperCase();
        // add rating above image
        $("#rating"+ i).html("<h3>Rating: " + y + "</h3>");
        // add original url and link to open in another window below image
        $("#title"+ i).html("<h5><a href='"+response.data[i].images.original.url+"' target='_blank'>"+ response.data[i].images.original.url + "</h5>");
      }
    });
}

function renderButtons() {

       // Deleting the buttons prior to adding new movies
       $("#button-view").empty();

       // Looping through the array of movies
       for (var i = 0; i < movieArray.length; i++) {

         // Generate buttons for each movie in the array

         var a = $("<button>");
         // Adding a class of movie to our button
         a.addClass("btn btn-md btn-success movie");
         // Adding a data-attribute
         a.attr("data-name", movieArray[i]);
         // Providing the initial button text
         a.text(movieArray[i]);
         // Adding the button to the button-view div
         $("#button-view").append(a);
       }
     }

function switchImage () {
		
		if ($(this).attr("data") === "still") {
			// switch from still to moving image
			$(this).attr("src", $(this).attr("data-animated"));
			$(this).attr("data", "animated");
			}

		else {
			// switch back from moving to still
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data", "still");
		}
}


$(document).ready(function () {

	renderButtons();

	$("#addmovie").on("click", function(event) {
    	event.preventDefault();

    	// This line grabs the input from the textbox
    	var movie = $("#movie-input").val().trim();

    	// if nothing is inputed do nothing
    	if (!(movie === "")) {   
    		// The movie from the textbox is then added to our array
    		movieArray.push(movie);
    		// Calling renderButtons which handles the processing of our movie array
			renderButtons();
			$('#movie-input').val(""); // clear input field
    		}
     });

	// on click events to display the giff and
	// switch the still giff for the moving giff and back
	$(document).on("click", ".movie", displayGiff);
	$(document).on("click", ".image", switchImage);
	$("#reset").on("click", function () {
		event.preventDefault();
		movieArray = ["Titanic", "Beverly Hills Cop", "The Princess Bride", "The Lord of the Rings", "Monty Python and the Holy Grail", "Star Wars", "Do the Right Thing"];
		renderButtons();
	});
	$("#resetall").on("click", function () {
		event.preventDefault();
		movieArray = [];
		renderButtons();
	});
});
