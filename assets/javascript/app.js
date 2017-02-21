//Giphy search using API

var queryURL = "http://api.giphy.com/v1/gifs/search?q=eddie+murphy&treanding?&api_key=dc6zaTOxFJmzC";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    	//document.write(response.data[1]);
      console.log(response.data[0]);
      //console.log(response.data[0].user.display_name);
      var j = 0;
      for (i=0; i < 12; i++) {
        $("#display"+ i).html("<img src='" + response.data[i].images.fixed_height_small_still.url + "'>");
        $("#rating"+ i).html("<h3>" + response.data[i].rating + "</h3>");
        $("#title"+ i).html("<h5><a href='"+response.data[i].images.fixed_height_small.url+"' target='_blank'>"+ response.data[i].url + "</h5>");
      }
    });