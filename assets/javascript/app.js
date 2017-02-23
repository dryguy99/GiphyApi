//Giphy search using API
var movieTitle = "";


    
var movieArray = ["Titanic", "Beverly Hills Cop", "The Princess Bride", "The Lord of the Rings"];
 



function displayGiff() {

       console.log(this);
       var title = $(this).attr('data-name');
       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=dc6zaTOxFJmzC&limit=12";
$.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    	//document.write(response.data[1]);
      console.log(response.data[0]);
      //console.log(response.data[0].user.display_name);
      var j = 0;
      for (i=0; i < 12; i++) {
        $("#display"+ i).html("<img src='" + response.data[i].images.fixed_height_still.url + "'" +
        						"data-animated='"+	response.data[i].images.fixed_height.url + "'" +
        						"data-still='" +	response.data[i].images.fixed_height_still.url + "'" +
        						"data='still' class='image'>");
        $("#rating"+ i).html("<h3>" + response.data[i].rating + "</h3>");
        $("#title"+ i).html("<h5><a href='"+response.data[i].images.fixed_height_small.url+"' target='_blank'>"+ response.data[i].url + "</h5>");
      }
    });
}

function renderButtons() {

       // Deleting the buttons prior to adding new movies
       $("#button-view").empty();

       // Looping through the array of movies
       for (var i = 0; i < movieArray.length; i++) {

         // Then dynamicaly generating buttons for each movie in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         //$("#movies-view").append(("<button class'movie mybutton' data-name='"+movies[i]+"'>")+movies[i] +("</button>"));
         console.log(movieArray[i]);
         var a = $("<button>");
         // Adding a class of movie to our button
         a.addClass("btn btn-lg btn-success movie");
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
			
			$(this).attr("src", $(this).attr("data-animated"));
			$(this).attr("data", "animated");
			console.log($(this).attr("data"));
			}
		else {
			
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data", "still");
			console.log($(this).attr("data"));
		}
}


$(document).ready(function () {
	renderButtons();

	$("#addmovie").on("click", function(event) {
    	event.preventDefault();

    	// This line grabs the input from the textbox
    	var movie = $("#movie-input").val().trim();
    	console.log(movie);;
    	if (movie === "") {    	}
    	else {

    	// The movie from the textbox is then added to our array
    	movieArray.push(movie);

    	// Calling renderButtons which handles the processing of our movie array
		renderButtons();
    	}

     });
	$(document).on("click", ".movie", displayGiff);
	$(document).on("click", ".image", switchImage);
});
