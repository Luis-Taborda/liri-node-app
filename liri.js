require("dotenv").config()
require("moment")
var axios =require("axios")
var fs = require("fs")
var keys = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)
var userInput = process.argv[2];
var userQuery = process.argv[3];

function runApp(userInput,userQuery){
    switch(userInput){
        case "concert-this":
            concertThis()
            break;
        case "spotify-this":
            spotifyThis()
            break;
        case "movie-this":
            movieThis()
            break;
        case "do-this":
            doThis(userQuery)
            break;
        default:
            console.log("I do not understand")
    }
}

runApp(userInput,userQuery)

function concertThis(){


}

function spotifyThis(){
    
    spotify
    .search({ type: 'track', query: userQuery, limit: 5 })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
  
    }

    function movieThis(){
        axios.get("http://www.omdbapi.com/?t= " + userQuery + "&y=&plot=short&apikey=trilogy&limit=1").then(
  function(response) {
    console.log(response)
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });


    }

    function doThis(){
        fs.readFile
    }

       
                
            

            
     
