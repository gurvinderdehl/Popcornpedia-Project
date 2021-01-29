$(document).ready(function () {
  renderRecentSearchBtns(retrieveRecentSearches());

  $("#add-movie").on("click", function (event) {
    event.preventDefault();

    var movie = storeRecentSearches(retrieveRecentSearches());

    renderRecentSearchBtns(retrieveRecentSearches());

    getMovieDetails(movie);

  });

  $(document).on("click", ".recent-search", getMovieClicked);

  function getMovieClicked() {
    getMovieDetails($(this).attr("movie-name"));
  }

  function storeRecentSearches(recentSearches) {
    var movie = $("#movie-input").val().trim();

    if (movie === "") {
      return;
    }

    recentSearches.push(movie);

    if (recentSearches.length > 3) {
      recentSearches = recentSearches.slice(1);
    }

    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    return movie;
  }

  function retrieveRecentSearches() {
    var storedSearches = JSON.parse(localStorage.getItem("recentSearches"));

    if (storedSearches === null) {
      return [];
    }

    return storedSearches;
  }

  function renderRecentSearchBtns(recentSearches) {
    $("#recent-search-btns").empty();

    for (var i = 0; i < 3; i++) {
      if (recentSearches[i] === undefined) {
        return;
      }

      var newButton = $("<button>");

      newButton.addClass("button secondary recent-search");
      newButton.attr("movie-name", recentSearches[i]);
      newButton.text(recentSearches[i]);

      $("#recent-search-btns").prepend(newButton);
    }
  }

  function getMovieDetails(movie) {
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      renderMainMovie(response);
      // converting actor string into array
      var actorArray = response.Actors.split(",");
      // logging all actors info
      for (var i = 0; i < actorArray.length; i++) {
        console.log(getCelebrityInfo(actorArray[i].trim()))
      };

    });

  };

  // getCelebrityInfo("Steven Spielberg");

  function getCelebrityInfo(name) {
    var apiKey = "Wvx0+onLZFq2287mLWm4CA==38WLOWdjk3UqQ6FZ";
    var queryURL =
      "https://api.celebrityninjas.com/v1/search?limit=1&name=" + name;

    $.ajax({
      method: "GET",
      url: queryURL,
      headers: { "X-Api-Key": apiKey },
      contentType: "application/json",
      success: function (response) {
        console.log(response);
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
  };

  // getSimilarMovies("Frozen");

  function getSimilarMovies(movie) {
    $.ajax({
      type: "GET",
      url: "https://tastedive.com/api/similar?limit=10",
      jsonp: "callback",
      dataType: "jsonp",
      data: {
        type: "movie",
        q: movie,
        k: "400900-Popcornp-N9NY6GRY",
      },
      success: function (response) {
        console.log(response.Similar.Results[0]);
      },
    });
  }

  function renderMainMovie(response) {
    $("#body-container").css("display", "block");

    $("#main-film-poster").attr("src", response.Poster);
    $("#main-film-name").text(response.Title + " (" + response.Year + ")");
    $("#main-film-synopsis").text(response.Plot);
  }
});

function populateActorsTab() {


};