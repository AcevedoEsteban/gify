$(document).ready(() => {
  $(".search").click(() => {
    if ($("#divA").children().length > 0) {
      $("#divA").slick("unslick");
      $("#divA").empty();
    }

    return getGif();
  });
  $("#Giphy").keypress((event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#gifButton").click();
    }
  });
});

function getGif() {
  let searchbtn = $("#Giphy").val();
  let apiKey = "HECDm9XInzsgYrbK6VZxfulkZiBvp39b";
  let apiKey2 = "HECDm9XInzsgYrbK6VZxfulkZiBvp39b";
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    searchbtn +
    "&api_key=" +
    apiKey2 +
    "&limit=25";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then((response) => {
    console.log(response);
    let results = response.data;
    for (let i = 0; i < results.length; i++) {
      let gifDiv = $("<div>");
      let searchedItem = $("<img>");
      searchedItem.attr("src", results[i].images.fixed_height.url);
      gifDiv.append(searchedItem);
      $("#divA").prepend(gifDiv);
    }
    $("img").on("click", (event) => {
      event.preventDefault();
      $("#sweepGifDiv").empty();

      let gif = $("<img>");
      gif.attr("src", event.target.src);
      // $("#divB").append(gif);
      $("#sweepGifDiv").append(gif);
    });

    // $("#divB").slick({
    //   autoplay: true,
    //   dots: true,
    //   speed: 300,
    //   autoplaySpeed: 2000,
    //   dots: true,
    //   responsive: [
    //     {
    //       breakpoint: 600,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 3,
    //         // infinite: true,
    //         // dots: true,
    //       },
    //     },
    //     {
    //       breakpoint: 2040,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 3,
    //       },
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 3,
    //       },
    //     },
    //   ],
    // });
    $("#divA").slick({
      autoplay: true,
      dots: true,
      speed: 300,
      autoplaySpeed: 2000,
      dots: true,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            // infinite: true,
            // dots: true,
          },
        },
        {
          breakpoint: 2040,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    });
  });
}
