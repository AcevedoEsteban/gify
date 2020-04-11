$(document).ready(function () {
  var search = $("#Music").val();

  var timeElement = $(".currentTime");
  var secondsRemaining = 0;

  $("#Music").keypress(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#musicButton").click();
    }
  });

  $("#musicButton").on("click", function (event) {
    event.preventDefault();
    $("#divC").empty();
    search = $("#Music").val();
    musicGrab();

    // $("#Music").val("");
    console.log(search);
  });
  $(".toggle-play").on("click", function () {
    song.trigger("play");
	isPlaying = true;
	var timeIntervalId = setInterval(function(){
		secondsRemaining++;
		timeElement.text("00:0" + secondsRemaining)
		$(".time").val(secondsRemaining);
		if (secondsRemaining === 7){
			song.trigger("pause");
			isPlaying=false;
			clearInterval(timeIntervalId)
			secondsRemaining = 0;
		  }
	}, 1000);

    console.log("playing...");
  });

  $(".toggle-pause").on("click", function () {
    song.trigger("pause");
    isPlaying = false;
    console.log("paused...");
  });

  // $("#divC").on("click", function (event) {
  // 	// audioPlayer.get(0).play()
  // 	console.log(event.target);
  // 	$("#divC").append($("<audio>"));

  // 	})
  var isPlaying = false;
  var song = $("<audio>");
  $.get();

  function musicGrab() {
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + search,
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "28fa3a645fmsh6347d64020ec954p186251jsn525605cce2a6",
      },
    };

    $.ajax(settings).then(function (response) {
      console.log(response);
      var musicData = response.data;
      for (let i = 0; i < musicData.length; i++) {
        var newTitle = $("<h4>");
        var newDiv = $("<div>");
        newDiv.attr("class", "has-text-centered");
        song.attr("src", musicData[i].preview);
        // audioPlayer.attr("class", "play")
        var newImg = $("<img>");
        newTitle.text(musicData[i].title_short);
        newImg.attr("src", musicData[i].album.cover_medium);
        newImg.attr("name", musicData[i].preview);
        newDiv.append(newTitle);
        $("#divC").append(newDiv);
        newDiv.append(newImg);
        // $("#divC").append(audioPlayer);
      }

      $("img").on("click", function (event) {
        song.attr("src", event.target.name);
        console.log(event.target.name);
      });

      // function makeSlider (){
      $("#divC").slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ],
      });
      // }
    });
  }
});
