/*
 *
 * Cinema Expandido WEB
 * Parcial "Película" (10/05/18)
 * Diego Morales
 * 
 *
 * URL: https://dimose.github.io/MovieApp/
 *

/*
VARIABLES
*/

var dataMDBActor;
var apiKey = "?api_key=21227f6ea743c8cd0f26674247a1b443";
var apiMov = "https://api.themoviedb.org/3/find/tt";
var apiAc = "https://api.themoviedb.org/3/find/nm";
var source = "&external_source=imdb_id";
var acValue;
var movValue;
var numValue;
var acPic;
var acName;
var movDate;
var knownFor;
var actorNumber;
var urlProfilePic;

/*
LIFE CYCLE METHODS
*/

function setup() {
  createCanvas(1920, 849);
  var button = select("#movie");
  var button2 = select("#actor");
  button.mousePressed(movieInfo);
  button2.mousePressed(actorInfo);
}

function draw() {
  background(0);
  textSize(25);
  imageMode(CENTER);
  textAlign(CENTER);
  fill(255);
   text("This site gives you a random movie or actor from IMDB", width / 2, 650);
  text("If button is not working after 5 tries please reload page", width / 2, 680);
  if (acPic) {

    image(acPic, width / 2, 250);
    textSize(50);
    text(acName, width / 2, 550);



  }

}

/*
API
*/

function actorInfo() {
  acValue = floor(random(1, 9833529));
  actorNumber = nf(acValue, 7);
  var url = apiAc + actorNumber + apiKey + source;
  loadJSON(url, actorData);
}

function movieInfo() {
  movValue = floor(random(1, 7137846));
  var movieNumber = nf(movValue, 7);
  var url = apiMov + movieNumber + apiKey + source;
  loadJSON(url, movieData);
}

function actorData(dataActor) {
  print("loading...");

  if (typeof dataActor.person_results[0] === "undefined") {
    actorInfo();
  } else {

    dataMDBActor = dataActor;

    if (dataMDBActor) {

      if (typeof dataMDBActor.person_results[0].profile_path === "object") {
        urlProfilePic = "assets/picture.png";
      } else {
        urlProfilePic = "https://image.tmdb.org/t/p/w300" + dataMDBActor.person_results[0].profile_path;
      }

      loadImage(urlProfilePic, gotPic);
      knownFor = dataMDBActor.person_results[0].known_for[0].title;
      acName = "Actor: " + dataMDBActor.person_results[0].name + "." + " Known For: " + knownFor;


      print("Actor: " + acName + ". Known for: " + knownFor);
    }
  }
}

function movieData(dataMovie) {
  print("loading...");

  if (typeof dataMovie.movie_results[0] === "undefined") {
    movieInfo();
  } else {
    dataMDBMovie = dataMovie;

    if (dataMDBMovie) {

      if (typeof dataMDBMovie.movie_results[0].poster_path === "object") {
        urlProfilePic = "assets/picture2.png";
      } else {
        urlProfilePic = "https://image.tmdb.org/t/p/w300" + dataMDBMovie.movie_results[0].poster_path;
      }

      loadImage(urlProfilePic, gotPic);
      movDate = dataMDBMovie.movie_results[0].release_date;
      acName = "Movie: " + dataMDBMovie.movie_results[0].title + ". Released: " + movDate;
      print("Movie: " + acName);
    }

  }
}

function gotPic(data) {
  acPic = data;
}
